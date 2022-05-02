---
title: "[AL] 5. Decrease-and-Conquer"
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

# Decrease-and-Conquer

## Decrease-and-conquer technique
문제에서 주어진 인스턴스에 대한 솔루션과 더 작은 인스턴스에 대한 솔루션 사이의 관계를 기반으로 문제를 푼다.
- 하향식(Top down) → 재귀적으로 구현(최종 구현은 비재귀적일 수 있음)
- 상향식(Bottom up) → 반복적 구현
  - 문제의 가장 작은 사례에 대한 해결책부터 시작하여 점진적dmfh 접근

## Decrease by a constant
알고리즘이 반복될 때 마다 인스턴스의 크기를 같은 상수만큼 줄인다. (보통 $1$)
![decreasebyconstant](/assets/img/%5BAL%5D5/decreasebyconstant.png){: width="50%" height="50%"} 

### The exponentiation problem
cmputing $a^n$
- Top down
  - $$f(n)=\begin{cases}
    f(n-1) \cdot a \quad if\ n>0 \\
    1 \qquad\quad\quad\quad\ \ if\ n=0
        
    \end{cases}$$
- Botoom up
  - 1에서부터 $a$를 $n$번 곱한다.

### Insertion sort
```
ALGORITHM InsertionSort(A[0..n-1])
    //Input: An array A[0..n-1] of n orderalbe elements
    //Output: Array A[0..n-1] sorted in nondecreasing order
    for i <- 1 to n-1 do
        v <- A[i]
        j <- i-1
        while j>=0 and A[j]>v do
            A[j+1] <- A[j]
            j <- j-1
        A[j+1] <- v
```

$$ A[0]\le\cdots\le A[j]<A[j+1]\le \cdots \le A[i-1] \ \vert\ A[i]\  \cdots \ A[n-1] $$
- basic operation : key comparison `A[j] > v`
- the worst-case
  - $$C_{worst}(n)=\sum^{n-1}_{i=1}\sum^{i-1}_{j=0}1=\sum^{n-1}_{i=1}i={n(n-1)\over2}\in\Theta(n^2)$$
- the best-case
  - $$C_{best}(n)=\sum^{n-1}_{i=1}1=n-1\in\Theta(n)$$
- the average-case
  - $$C_{avg}(n)\approx{n^2\over4}\in\Theta(n^2)

### Topological sorting
`Dag` : directed acyclic graph
`Topological sorting` : dag의 정점들에 대해 모든 starting 정점이 ending 정점보다 앞에 위치하는 선형적인 순서에 따라 정렬하며 dag에서만 가능하다

- Source-removal algorithm : 들어오는 간선이 없는 정점들과 그 정점에서 나가는 간선들을 지워가면서 정렬한다


## Decrease by a constant factor
알고리즘이 반복될 때 마다 인스턴스의 크기를 같은 상수 factor 만큼 줄인다. (보통 $1/2$)

![decreasebyconstantfactor](/assets/img/%5BAL%5D5/decreasebyconstantfactor.png){: width="48%" height="48%"} 

### The exponentiation problem
$$a^n= \begin{cases}
    (a^{n/2})^2 \qquad \quad\ \  if\ n\ is\ even\ and\ positive, \\
    (a^{(n-1)/2})^2\cdot a \quad if\ n\ is\ odd\,\\
    1 \qquad\qquad \quad \ \ \ \ if\ n=0
\end{cases}$$

### Binary search

<p align="center"><img src="/assets/img/%5BAL%5D5/bs1.png" width="50%" height="50%"></p>

```
ALGORITHM BinarySearch(A[0..n-1], K)
    //Input: An array A[0..n-1] sorted in ascending order and a search key K
    //Output: An index of the array's element that is equal to k or -1 if there is no such element
    l <- 0; r <- n-1
    while l <= r do
        m <- ⌊(l+r)/2⌋
        if K = A[m] return m
        else if K < A[M] r <- m-1
        else l <- m+1
    return -1 
```



For $K=70$
<p align="center"><img src="/assets/img/%5BAL%5D5/bs2.png" width="60%" height="60%"></p>


### Fake-Coin Problem


### Russian Peasant Multiplication
두 양수의 곱을 구하는 문제

<img src="/assets/img/%5BAL%5D5/RPM.png" width="50%" height="50%">
- $n\cdot m =\begin{cases} {n\over2}\cdot 2m \\ {n-1\over2}\cdot 2m + m \end{cases}$
- $1\cdot m = m$ to stop



## Variable-size decrease

### Euclid's algorithm
$$gcd(n,\ m) = gcd(n,\ m\ mod \ n)$$


### Selection problem
$n$개의 원소 중 $k$번째로 작은 수를 찾는 문제
- 정렬 기반 알고리즘
  -  Efficiency : $O(n\log n)$
- partitioning
  - <img src="/assets/img/%5BAL%5D5/partitioning.png" width="70%" height="70%">

#### Lomuto partitioning
<img src="/assets/img/%5BAL%5D5/lomuto.png" width="70%" height="70%">
```
ALGORITHM LomutoPartition(A[l..r])
    //Input: A subarray A[1..r] of array A[0..n-1], defined by its left and right indices l and r (l<=r)
    //Output: Partition of A[l..r] and the new position of the pivot
    p <- A[l]
    s <- l
    for i <- l to r do
        if A[i] < p
            s <- s+1; swap(A[s], A[i])
    swap(A[l], A[s])
    return s
```

- $s=k-1$ 이라면 문제 해결
- $s>k-1$ 왼쪽에서 $k$번째로 작은 원소 다시 탐색
- $s<k-1$ 오른쪽에서 $(k-s)$번째로 작은 원소 다시 탐색

#### Quickselect algorithm
```
ALGORITHM Quickselect(A[l..r], k)
    //Input: Subarray A[1..r] of array A[0..n-1] of orderable elements and iteger k(1<=k<=r-l+1) 
    //Output: The value of the kth smallest element in A[l..r]
    s <- LomutoPartition(A[l..r]) //or another partition algorithm
    if s=l+k-1 return A[s]
    else if s>l+k-1 Quickselect(A[l..s-1], k)
    else Quickselect(A[s+1..r], l+k-1-s)
```
- $C_{best}(n) = n-1 \in \Theta(n).$
- $C_{worst}(n) = (n-1) + (n-2) + \ \cdots\ + 1 = (n-1)n/2 \in \Theta(n^2)$
- $C_{avg}(n) \rightarrow linear$

### Interpolation search
- binary search : search key를 항상 정렬된 배열의 중앙값과 비교
- Interpolation search : search key의 값을 고려하여 비교할 값을 정함
    <p align="center"><img src="/assets/img/%5BAL%5D5/interpolation.png" width="70%" height="70%"></p>

$$x=l+\lfloor{(v-A[l])(r-l)\over A[r]-A[l]}\rfloor $$

- Efficiency
    - Basic operation: key comparison
    - average case: $C(n)<\log_2\log_2 n +1$ 
    - worst case: $C(n)=n$

### Binary Search Tree 
- Efficiency
    - $C_{worst}(n) = \Theta(n)$
    - $C_{avg}(n) = \Theta(\log n)$

## Generating Combinatorial Objects
Minimal-change requirement
- Advantage of this order in TSP

#### Johnson-Trotter algorithm
```
ALGORITHM JohnsonTrotter(n)
    //Input: A positive integer n
    //Output: A list of all permutations of {1,...,n}
    initialize the first permutation with 1(<-)2(<-)...n(<-)
    while the last permutation has a mobile element do
        find its largest mobile element k
        swap k with the adjacent element k's arrow points to
        reverse the direction of all the elements that are larger than k
        add the new permutation to the lis
```
- An application of Johnson-Trotter algorithm $(n=3)$
    <p align="center"><img src="/assets/img/%5BAL%5D5/J-T.png" width="70%" height="70%"></p>
- 가장 효율적인 generating permutations 알고리즘 중 하나이다.
- Time efficiency: Θ(𝑛!)


## Generating Subsets
Minimal change algorithm

### Binary Reflected Gray Code (BRGC)
```
ALGORITHM BRGC(n)
    //Input: A positive integer n
    //Output: A list of all bit strings of length n composing the Gray code
    if n=1 make list L containing bit string 0 and 1 in this order
    else generate list L1 of bit strings of size n-1 by calling BRGC(n-1)
        copy list L1 to list L2 in reversed order
        add 0 in front of each bit string in list L1
        add 1 in front of each bit string in list L2
        append L2 to L1 to get list L
    return L
```
- `L`의 첫번째 원소와 마지막 원소도 1 비트 차이나기 때문에 `cyclic`이라고 한다.