// WARNING: DO NOT USE THE CODE IN PRODUCTION, AS IT DOESN'T COVER ALL THE REQUEST AND ERROR CASES
class ResumableFetch {
	constructor(input, init) {
		this.aborter = null;
		this.request = null;
		this.length = 0;
		this.total = null;
		this.done = false;
		this.contentType = null;
		this.chunks = [];
		// ignore called as `fetch(input: Request)` at this time
		this.input = input;
		this.init = init || {};
	}

	start() {
		if (this.done) {
			return Promise.reject(new Error('The chunks have been piped out'));
		}
		if (this.aborter && !this.aborter.signal.aborted) {
			return this.request;
		}

		this.aborter = new AbortController();
		const { headers = {} } = this.init;
		const init = {
			...this.init,
			headers: {
				...headers,
				...(this.length ? {
					Range: `bytes=${this.length}-`
				} : false)
			},
			signal: this.aborter.signal
		};

		this.request = fetch(this.input, init).then((res) => {
			this.contentType = res.headers.get('content-type');
			const total = res.headers.get('content-length');
			if (!this.length) {
				this.total = total;
			} else if (total === this.total) {
				// server may not support range request
				this.reset();
			}
			return res.body.getReader();
		}).then(reader => this.readChunks(reader)).then((chunks) => {
			const stream = new ReadableStream({
				start(controller) {
					const push = () => {
						const chunk = chunks.shift();
						if (!chunk) {
							controller.close();
							return;
						}
						controller.enqueue(chunk);
						push();
					};
					push();
				}
			});

			return new Response(stream, {
				headers: {
					'content-type': this.contentType,
					'content-length': this.total
				}
			});
		}).catch((err) => {
			this.abort();
			this.aborter = null;
			throw err;
		});

		return this.request;
	}

	readChunks(reader) {
		return reader.read().then(({ value, done }) => {
			if (done) {
				this.done = true;
				return this.chunks;
			}

			this.chunks.push(value);
			this.length += value.length;
			if (this.onprogress) {
				this.onprogress({
					lengthComputable: !!this.total,
					total: this.total,
					loaded: this.length
				});
			}
			return this.readChunks(reader);
		});
	}

	abort() {
		if (this.aborter) {
			this.aborter.abort();
		}
	}

	reset() {
		this.chunks = [];
		this.length = 0;
	}
}


const url = 'https://objectstorage.ap-tokyo-1.oraclecloud.com/p/NdUkEhIYzjlI_H_9RRUeDb5pSym8geoWJ0hRVNctCEY/n/nrzblovvku9x/b/bucket-ccloli/o/adorable-animal-cat-730896.jpg';
const progress = document.getElementById('progress');
const action = document.getElementById('action');
const img = document.getElementById('img');
const status = document.getElementById('status');
let isDownloading = false;

const request = new ResumableFetch(url);
request.onprogress = ({ total, loaded }) => {
    progress.value = loaded / total;
    status.textContent = `Downloading (${loaded}/${total})`;
};
action.addEventListener('click', () => {
    if (isDownloading) {
        isDownloading = false;
        request.abort();
        action.textContent = 'Resume';
        status.textContent = 'Paused';
    } else {
        isDownloading = true;
        request.start()
            .then(res => res.blob())
            .then((blob) => {
                action.style.display = 'none';
                const url = URL.createObjectURL(blob);
                img.src = url;
                img.style.display = 'block';
                status.textContent = 'Done';
            });
        action.textContent = 'Pause';
        status.textContent = 'Downloading';
    }
});