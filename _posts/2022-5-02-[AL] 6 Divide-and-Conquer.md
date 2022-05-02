---
title: "[AL] 6. Divide-and-Conquer"
categories:
 - ComputerScience
tags: 
- algorithm
- CSE214
toc: true
toc_sticky: true
toc_label: CSE214
toc_icon: pen

---
>Materials are adapted from “Introduction to the design & Analysis of Algorithms,” 3rd ed., by A. Levitin

# Divide-and-Conquer

## Divide-and-conquer technique
- 가장 잘 알려진 알고리즘 설계 기법이다.
- 문제는 같은 유형의 이상적으로 크기가 같은 여러 하위 문제로 나뉜다.
- 하위문제는 일반적으로 재귀적으로 해결되고 하위 문제에 대한 솔루션을 결합하여 원래 문에에 대한 솔루션을 구한다.
-  Divide-and-conquer technique은 각각의 하위문제를 자체 프로세서에 의해 동시에 해결할 수 있는 병렬 계산에 이상적으로 적합하다.

 <p align="center"><img src="/assets/img/%5BAL%5D6/dividenconquer.png" width="70%" height="70%"></p>

## General divide-and-conquer recurrence
사이즈가 $n$인 인스턴스를 사이즈가 $n/b$인 인스턴스로 나누고 그것을 $a$번 풀어야할 때, $a\ge1$, $b>1$. 
$$T(n)=aT(n/b)+f(n)$$
$f(n)$은 인스턴스를 나누고 합치는데 걸리는 시간에 대한 함수이다.

### Master Theorem

If $f(n)\in\Theta(n^d)$ where $d\ge 0$ in recurrence, then
$$T(n)\in 
\begin{cases} 
\Theta(n^d) \qquad \quad \ if\ a<b^d\\ 
\Theta(n^d\log n) \quad if\ a<b^d\\ 
\Theta(n^{\log_ba})\quad \ \ \ if\ a<b^d
\end{cases}$$

## Mergesort
```
ALGORITHM Mergesort(A[0..n-1])
    //Input: An Array A[0..n-1] of orderable elements
    //Output: Array A[0..n-1] sorted in nondecreasing order
    if n > 1
        copy A[0..⌊n/2⌋-1] to B[0..⌊n/2⌋-1]
        copy A[⌊n/2⌋..n-1] to C[0..⌊n/2⌋-1]
        Mergesort(B[0..⌊n/2⌋-1])
        Mergesort(C[0..⌊n/2⌋-1])
        Merge(B, C, A)

```
```
ALGORITHM Merge(B[0..p-1], C[0..q-1], A[0..p+q-1])
    //Input: Arrays B[0..p-1] and C[0..q-1] both sorted
    //Output: Sorted array A[0..p+q-1] of the elements of B and C
    i <- 0; j <- 0; k <- 0;
    while i < p and j < q do
        if B[i] <= C[j]
            A[k] <- B[i]; i <- i+1
        else 
            A[k] <- C[j]; j <- j+1
        k <- k+1
    if i = p
        copy C[j..q-1] to A[k..p+q-1]
    else
        copy B[i..p-1] to A[k..p+q-1]    
```

 <p align="center"><img src="/assets/img/%5BAL%5D6/mergesort.png" width="70%" height="70%"></p>

- The number of key comparison
  - $C(n) = 2C(n/2)+C_{merge}(n)$ for $n>1$, $C(1)=0$
  - $C_{merge}(n) = n-1$
  - $C_{worst}(n) = 2C_{worst}(n/2)+n-1$ for $n>1$, $C_{worst}(1)=0$
  - C_{worst}(n)\in\Theta(n\log n)$
- Stable
- Space requirement : $\Theta(n)$ (not in-place)

## Quicksort
 <p align="center"><img src="/assets/img/%5BAL%5D6/quicksort.png" width="70%" height="70%"></p>
- Mergesort가 요소들의 위치에 따라 나눈거라면 Quicksort는 값에 따라 나눈다.


```
ALGORITHM Quicksort(A[l..r])
    //Input: Subarray of array A[0..n-1], defined by its left and right indices l and r
    //Output: Subarray A[l..r] sorted in nondecreasing order
    if l < r
        s <- Partition(A[l..r]) // s is a split position
        Quicksort(A[l..s-1])
        Quicksort(A[s+1..r])
```

### Partitioning Algorithm
```
ALGORITHM HoarePartition(A[l..r])
    //Input: Subarray of array A[0..n-1], defined by its left and right indices l and r (l < r)
    //Output: Partition of A[l..r], with the split position returned as this function's value 
    p <- A[l]
    i <- l; j <-  r+1
    repeat
        repeat i <- i+1 until A[i] >= p
        repeat j <- j-1 until A[j] <= q
        swap(A[i], A[j])
    until i >= j
    swap(A[i], A[j]) //undo last swap when i >= j
    swap(A[l], A[j])
    return j
```
<p align="center"><img src="/assets/img/%5BAL%5D6/pa1.png" width="70%" height="70%"></p>
<p align="center"><img src="/assets/img/%5BAL%5D6/pa2.png" width="70%" height="70%"></p>
<p align="center"><img src="/assets/img/%5BAL%5D6/pa3.png" width="70%" height="70%"></p>

### Analysis of Quicksort
- Best case: 중간에서 split — $\Theta(n\log n)
- Worst case: 이미 정렬된 배열 — $\Theta(n^2)
- Average case: random 배열 —$\Theta(n\log n)
  - 보통 Mergesort보다 빠르다
- Improvements:
  - pivot을 선택할 때 세 개의 값중 중간값을 선택
  - 매우 작은 subarray에서 insertion sort 사용
- Not Stable

## Binay Tree
Binary trees와 관련된 많은 문제가 divede-and-conquer technique로 해결된다.
<img src="/assets/img/%5BAL%5D6/BT.png" width="70%" height="70%">

### Height
```
ALGORITHM HEIGHT(T)
    //Input: A binary tree T
    //Output: The height of T
    if T = NULL return -1
    else return max{Height(T_left), Height(T_right)}+1
```
### Traversals
- preorder traversal
- inorder traversal
- postorder traversal

### Multiplication of Large Integers

두 자리수 정수$a$, $b$를 $a=a_1a_0$,  $b=b_1b_0$로 나누어 계산한다.

$$ c = a*b = c_210^2+c_110^1+c_0$$

$c_2=a_1*b_1$ 첫째 자리수의 곱

$c_0=a_0*b_0$ 둘재 자리 수의 곱

$c_1=(a_1+a_0)*(b_1+b_0)-(c_2+c_0)$ 각 자리수의 합을 곱한 값에 $c_2$, $c_0$를 뺀 값

$n$-자리수의 경우

$$ c = a*b = c_210^n+c_110^{n/2}+c_0$$

$c_2=a_1*b_1$ 앞쪽 반의 자리수의 곱

$c_0=a_0*b_0$ 뒷쪽 반의 자리수의 곱

$c_1=(a_1+a_0)*(b_1+b_0)-(c_2+c_0)$ 각 자리수의 합을 곱한 값에 $c_2$, $c_0$를 뺀 값

- 곱 횟수 : $M(n)=3M(n/2)$ for $n>1$, $M(1)=1$.
  - $M(n) = 3^{\log_2n}$

### Closest-Pair Problem 
<img src="/assets/img/%5BAL%5D6/cp1.png" width="30%" height="30%">
<img src="/assets/img/%5BAL%5D6/cp2.png" width="60%" height="60%">

- Recurrence for the running time of the algorithm
  - $T(n) = 2T(n/2) + f(n) $, where $f(n)\in\Theta(n)$
  - Applying the Master Theorem (with $a=2$, $b=2$, and $d=1$),  $T(n)\in\Theta(n\log n)$

### Convex-Hull
- Quickhull
  - $n$개의 점들 ($p_1(x_1, y_1), \cdots, p_n(x_n,y_n)$이 집합 $S$에 속해있다.
  - $n$개의 점들을 $x$좌표를 기준으로 정렬한 뒤 양 끝점 $p_1$, $p_n$을 지나는 직선을 중심으로 위쪽을 $S_1$, 아래쪽을 $S_2$로 $S$를 두개의 평면으로 나눈다.
<p align="center"><img src="/assets/img/%5BAL%5D6/ch1.png" width="60%" height="60%"></p>

#### Quickhull 
- $S_1$이 비어있을 경우 두 점 $p_1$, $p_n$을 연결한 선분을 추가한다.
- $S_1$이 비어있지 않을 경우 집합 $S_1$의 점중 직선 $\overrightarrow{p_1p_n}$과의 거리가 가장 먼 점 $p_max$을 찾는다.
- $\overrightarrow{p_1p_{max}}$의 왼쪽에 있는 점들의 집합을 $S_{1,1}$, $\overrightarrow{p_{max}p_n}$의 왼쪽에 있는 점들의 집합을 $S_{1,2}$라고 하고 이 집합들에 대해 위의 과정을 반복한다.

<p align="center"><img src="/assets/img/%5BAL%5D6/qh.png" width="60%" height="60%"></p>

- worst-case : $\Theta(n^2)$
- average-case : lnear