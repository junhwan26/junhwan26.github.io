---
title: "[AL] 4. Brute Force and Exhaustive Search"
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

# Brute Force
문제를 해결하기 위한 간단한 접근 방식이며, 보통 문제의 문장과 관련된 개념의 정의에 직접적으로 기초한다. 

영리하거나 효율적인 알고리즘의 소스가 되는 경우는 드물지만 Brute force는 중요한 알고리즘 디자인 전략으로써 간과해선 안된다.
1. 매우 다양한 문제에 적용될 수 있다.
2. 어떤 중요한 문제에 대해 적어도 입력의 크기에 제한 없는 실제적인 값에 의미있는 알고리즘이 된다.
   - ex) sorting, searching, matrix multiplication, string matching 
3. 적은 수의 입력만 해결할 필요가 있고 허용할만한 속도로 해결할 수 있다면 더 효율적인 알고리즘을 만들기 위해 비용을 들이지 않아도 된다.
4. 일반적으로 매우 비효율적이더라도 작은 크기의 입력을 가진 문제를 푸는데 있어서 유용할 수 있다.
5. 더욱 효율적인 대안을 판단하는 기준으로 이론적, 교육적 목적을 제공한다.

## Sorting

### Selection sort
```
ALGORITHM SelectionSort(A[0..n-1])
    //Input: An array A[0..n-1] of orderable elements
    //Output: Array A[0..n-1] sorted in nondecreasing order
    for i <- 0 to n-2 do
        min <- i
        for j <- i+1 to n-1 do
            if A[j] < A[min] min <- j
        swap A[i] and A[min]
```
- Input Size: The number of elements, n
- Basic operation: The key comparison
    $$C(n)=\sum^{n-2}_{i=0}\sum^{n-1}_{j=i+1}1==\sum^{n-2}_{i=0}(n-1-i)={(n-1)n\over 2}$$
- 모든 입력에서 $\Theta(n^2)$ 
- key의 swap은 $n-1$번만 일어난다. 이것은 다른 정렬 알고리즘과 비교하였을 때 좋은 점이다.

### Bubble sort
```
ALGORITHM BubbleSort(A[0..n-1])
    //Input: An array A[0..n-1] of orderable elements
    //Output: Array A[0..n-1] sorted in nondecreasing order
    for i <- 0 to n-2 do
        for j <- n-2-i to n-1 do
            if A[j+1] < A[j] swap A[j] and A[j+1]
```
- key comparison 횟수는 모든 입력에 대해 동일하나 swap 횟수는 입력에 따라 달라진다.
- worst case에서 swap 횟수와 comparison 횟수가 같다
- 각 반복에서 교환이 한번도 일어나지 않았다면 알고리즘을 멈추는것으로 개선할 수 있다.
  

## Search

### Sequential Search
```
ALGORITHM SequentialSearch2(A[0..n],K)
    //Input: An Array A of n elements and a search key K
    //Output: The index of the first element in A[0..n-1] whose value is equal to K or -1 if no such element is found
    A[n] <- K
    i <- 0
    while A[i] != K do
        i <- i+1
    if i < n return i
    else return -1 
```
- 배열이 정렬되어 있다면 요소가 search key보다 크거나 같아진다면 알고리즘을 멈추는 것으로 개선할 수 있다.

### String matching
```
ALGORITHM BruteForceStringMatch(T[0..n-1], P[0..m-1])
    //Input: An array T[0..n-1] of n characters representing a text and
             An array P[0..m-1] of m characters representing a pattern
    //Output: The index of the first character in the text that starts a matching substring or -1 if the search is unsuccessful
    for i <- 0 to n-m do
        j <- 0
        while j < m and P[j] = T[i+j] do
            j <- j+1
        if j = m return i
    return -1    
```
- 최악의 경우 이 알고리즘은 $m(n-m+1)$개의 character를 비교해야하고 이것은 $O(nm)이다.
- 그러나 일반적인 자연어 텍스트의 경우 대부분 매우 적은 비교 이후 `i`의 이동이 일어날 것으로 기대해야한다.
- 랜덤 텍스트에서 검색할 경우 $\Theta(n)$로 보였다.

## Geometric problems

### Closest-Pair Problem
점들의 집합에서 가장 가까운 두 점을 찾기.
```
ALGORITHM BruteForceClosestPair(P)
    //Input: A list P of n (n>=2) points p1(x1,y1),...,pn(xn,yn)
    //Output: The distance between the closest pair of points
    d <- ∞
    for i <- 1 to n-1 do
        for j <- i+1 to n do
            d <- min(d, sqrt((xi-xj)^2 + (yi-yj)^2))
    return d
```
- Basic operation: computing the sqrt -> squaring a number
    $$C(n)=\sum^{n-1}_{i=1}\sum^{n}_{j=i+1}2 = 2\sum^{n-1}_{i=1}(n-i)=n(n-1)\in\Theta(n^2)$$

### Convex-Hull Problem
평면 또는 고차워너 공간의 특정 점 집합에서 볼록 껍질 찾기.
- 컴퓨터 기하학에서 가장 중요한 문제들 중 하나이다.
- 볼록 껍질은 주어진 물체의 모양과 데이터 셋에 가까운 근사치를 제공한다.
-  정의
   -  공간상에서 점들의 집합(유한 or 무한)의 어느 두 점 $p$와 $q$에 대해 $p$와 $q$의 끝점을 연결한 선분들이 모두 집합에 속한다면 Convex한다고 한다.
  
![convexhull](/assets/img/%5BAL%5D4/convexhull.png){: width="70%" height="70%"}

- Algorithm
  - 두 점 $(x_1,\ y_1),\ (x_2,\ y_2)$을 지나는 직선은 다음과 같이 정의된다
    $$ax+by=c$$
    $$a=y_2-y_1,\ b=x_1=x_2,\ c=x_1y_2-y_1x_2$$
  - 이 직선의 방정식은 평면을 $ax+by>c$ 와 $ax+by<c$ 두개의 평면으로 나눈다.
  - 모든 점들이 같은 평면에 있다면 그 직선을 선택한다.
    - $ax+by-c$의 부호를 확인하는 방법을 사용한다.
- Time efficiency : $O(n^3)$

# Exhaustive Search
## Combinational problems

### TSP 
최소비용으로 모든 도시를 여행하는 방법을 찾는 문제
![TSP](/assets/img/%5BAL%5D4/TSP.png){: width="70%" height="70%"}
- The total number of permutations : ${1\over2}(n-1)!$

### Knapsack problem
weight $w_i$, value $v_i$를 가진 $n$개의 아이템의 부분집합 중 가방에 담을 수 있는 가장 비싼 집합을 찾는 문제
![knapack](/assets/img/%5BAL%5D4/knapsack1.png){: width="50%" height="50%"} 
![knapack](/assets/img/%5BAL%5D4/knapsack2.png){: width="40%" height="40%"}
- 모든 부분집합을 만들고 가방에 담을 수 있는 부분 집합 중 가장 비싼 부분집합을 선택한다.
- The number of subsets of an n-element set is $2^n$
  - $\Omega(2^n)$ algorithm

### Assigntment problem
$n$명의 사람에게 $n$개의 일을 한 사람 당 하나씩 최소 비용으로 부여하는 문제
![assign](/assets/img/%5BAL%5D4/assign.png){: width="100%" height="100%"} 

![assign2](/assets/img/%5BAL%5D4/assign2.png){: width=100%" height="100%"}
- 가능한 모든 순열을 구한 뒤 각 순열마다 비용을 구해 최소값을 갖는 순열을 찾는다.

