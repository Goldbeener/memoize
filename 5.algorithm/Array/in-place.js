/**
 * in-place 原地
 * 不引入新的数组结构，不会造成额外内存开销
 * 在大规模项目中可以见少运行时复杂度和内存占用空间
 * */ 


// in-place 去重
const a = [0, 0, 1, 1, 2, 2, 3, 3];
function removeDuplicates(a) {
    let i = 0;
    for (j = 1; j < a.length; j++) {
        if ( a[i] !== a[j] ) {
            i++;
            a[i] = a[j];
        }
    }

    return i + 1;
}
