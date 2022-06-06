---
title: "[AL] 7. Transform-and-Conquer"
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

# Transform-and-Conquer

## Transform-and-conquer technique
- 두가지 절차
  1. 인스턴스들을 문제를 더 풀기 쉽도록 변형한다
  2. 변형된 입력들로 문제를 해결한다.

- 주어진 인스턴스의 세 가지 주요 변형:
  1. Instance Simplication: 동일한 문제의 더 단순하고 편리한 인스턴스로 전환
  2. Representation change: 동일한 인스턴스의 다른 표현으로 변경
  3. Problem reduction: 알고리즘을 이미 사용할 수 있는 다른 문제로 이동

## Instance Simplication
동일한 문제의 다른 단순하고 쉬운 인스턴스로 변환하여 문제 해결

### Presorting
리스트와 관련된 많은 문제는 리스트를 정렬되었을 때 쉽게 풀 수 있다.
- searching 
- selection problem
- element uniqueness
알고리즘의 시간 효율은 사용하는 정렬 알고리즘의 효율성에 따라 달라질 수 있다.

#### Checking Element Uniqueness
- Brute Force algorithm
  - 모든 원소 쌍들을 비교한다.
  - The worst-case efficiency: $\Theta(n^2)$
- Presorting-based algorithm
  - Stage 1 : 효울적인 정렬 알고리즘으로 원소들을 정렬한다.
  - Stage 2 : 인접한 두 원소가 같은 값인지 확인한다. 
  - Efficiency : $T(n)=T_{sort}(n)+T_{scan}(n) \in \theta(n\log n)+\theta(n) = \theta(n \log n)$
  - ```
    ALGORITHM PresortElementUniqueness(A[0..n-1])
        //Solved the arry uniqueness problem by sorting the array first
        //Input: An Arrays A[0..n-1] of oderable elements
        //Output: Returns "true" if A has no equal elements, "false" otherwise
        sort the array A
        
        for i <- 0 to n-2 do
            if A[i] = A[i+1] return false
        return true
    ```

#### Computing a mode
주어진 숫자 리스트에서 최빈값을 찾는 문제
- Brute Force algorithm
  - 각 원소들의 빈도를 나타내는 리스트를 만들어 비교한다.
  - The worst-case efficiency: $\Theta(n^2)$
- Presorting-based algorithm
  - Stage 1 : 효울적인 정렬 알고리즘으로 원소들을 정렬한다. (원소들을 정렬하면 같은 원소들은 서로 인접하게된다.)
  - Stage 2 : 인접한 같은 원소들의 갯수를 센다. 
  - ```
    ALGORITHM PresortMode(A[0..n-1])
        //Computes the mode of an array by sorting it  first
        //Input: An Arrays A[0..n-1] of oderable elements
        //Output: The array's mode 
        sort the array A
        i <- 0
        modefrequency <- 0
        while i<= n-1 do
          runlength <- 1; runvalue <- A[i]
          while i + runlength <= n-1 and A[i + runlength] = runvalue
            runlength <- runlength + 1
          if runlength > mmodefrequency
            modefrequency <- length; modevalue <- runvalue
          i <- i + runlength
        return modevalue
    ```
  - 알고리즘이 실행되는 시간은 정렬이 실행되는 시간에 의해 결정된다.
  
#### Searching problem
주어진 `K`를 `A[0..n-1]에서 찾는 문제
- Brute Force algorithm
  - 순차탐색
  - Efficiency: $O(n)$
- Presorting-based algorithm
  - Stage 1: 효울적인 정렬 알고리즘으로 원소들을 정렬한다.
  - Stage 2: binary search를 사용한다.
  - $T(n) = T_{sort}(n) + T_{search}(n) \in \Theta(n \log n) + \Theta(\log n)= \Theta(n \log n)$
  - 순차탐색보다 오래걸리지만 탑색을 한 번 이상 해야될 경우 유용하다.
  
점들의 집합을 다루는 많은 기하학적 알고리즘은 한 가지 방법 또는 다른 방법으로 사전 정렬을 사용한다.
방향 비순환 그래프의 일부 문제는 해당 이중 그래프를 위상적으로 정렬한 후 더 쉽게 해결할 수 있다.
대부분의 그리디 알고리즘은 입력의 사전 정렬을 그들의 작업의 본질적인 부분으로 요구한다.

## Searching algorithm의 분류
- List searching
  - sequential search
  - binary search
  - interpolation search
- Tree searhcing
  - binary search tree
  - binary balanced trees: AVL trees, red-black trees
  - multiway balanced trees: 2-3 trees, 2-3-4 trees, B trees
- Hashing
  - open hashing (separate chaining)
  - closed hashing (open addressing)

### Binary Search Tree
노드당 하나의 요소인 정렬 가능한 항목 집합의 요소를 포함하는 이진 트리.
왼쪽 하위 트리의 모든 요소가 하위 트리의 루트 요소보다 작고 오른쪽 하위 트리의 모든 요소가 하위 트리보다 큽니다.
집합에서 이진 검색 트리로의 변환은 `reqresentation-change technique`의 한 예이다.
- Operations
  - Searching
  - Insertion 
  - Deletion 
- worst case efficiency : $\Theta(n)$
- average case efiiciency : $\Theta(\log n)$
- 중위순회로 정렬할 수 있다.

### Balanced Search Trees
한 쪽으로 치우치는 worst-case를 피하기 위해 만들어진 Tree
- `unbalanced binary search tree`를 `balanced binary search tree`로 바꾸는 방법 (`instance-simplication`)
  - self-balancing
  - AVL trees
  - red-black trees
- 각 노드에 너 두 개 이상의 노드를 포함하도록 하는 방법 (`representation-change`)
  - 2-3 trees
  - 2-3-4 trees
  - B-trees

#### AVL trees
모든 노드의 `balance factor`가 $0$, $-1$, $+1$인 트리

-  Rotation : 새로운 노드가 삽입되었을 때 AVL tree가 unbalanced해진다면 `rotation`를 통해 바꿔준다.
   - single right rotation (R-rotation)
   - single left rotation (L-rotation)
   - double left-right rotation (LR-rotation)
   - double right-left rotation (RL-rotation)
- Efficiency : $\Theta(\log n)$
- 단점
  - rotation이 자주 일어난다.
  - 각 노드의 `balance factor`를 관리해야한다.

#### Multiway Search Trees
같은 노드에 한개 이상의 `key`를 갖는 것을 허용하는 트리
$n-1$개의 정렬된 `key`를 가진 노드를 `n-node`라고 한다.

##### 2-3 trees
- `2-node`와 `3-node`만을 갖는 트리
- 모든 `leaf node`가 같은 `level`에 존재한다.
- `3-node`인 `leaf node`에 삽입이 일어난다면 가운데 `key`를 기준으로 두개로 나눈다.
- $\log_{3}(n+1)-1 \leq h \leq log_{2}(n+1)-1$
-  Efficiency : $\Theta(\log n)$


#### Heap
Heap은 가장 효율적으로 우선순위 큐를 구현하는 방법이다.
다음 두가지 조건을 만족하는 binary tree이다.
1. shape property
   - `essentially complete (simply complete)
   - 마지막 `level`을 제외한 모든 `level`에 노드가 모두 차있고 마지막 `level`만 오른쪽에서 부터 비어있다.
2. parental dominance
   - 모든 노드의 `key`값은 자식 노드의 키 값보다 크거나 같아야한다.

- Heap properties
  - 형제노드들끼리의 순서는 존재하지 않는다.
  - root 노드의 `key`값은 가장 큰 `key`값이다.
  - 배열로 구현이 가능하다.
  - 모든 노드를 root로 하는 `subtree` 또한 heap 이다.

##### Heap Sort
- Stage 1: 주어진 배열으로 heap을 만든다.
  - worst-case : $O(n)$
- Stage 2: heap에서 n-1번 삭제하여 순서대로 나열한다.
  - worst-case : $O(n \log n)$
- in-place
- heapsort는 quicksort보다 느리고 mergesort와 비슷한 속도를 보인다.

## Horner's Rule
`representation-change` technique의 예로 다항식을 계산하는 알고리즘이다.
$$p(x) = (\cdots(a_nx+a_{n-1})x+\cdots)x+a_0$$
```
ALGORITHM Horner(P[0..n], x)
    //Evaluates a polynomial at a given point by Horner's rule
    //Input: An array P[0..n] of coefficients of a polynomial of degree n, sorted from the lowest to the highest and a number x
    //Output: The value of the polynomial at x
    p <- P[n]
    for i <- n-1 downto 0 do
        p <- x*p + P[i]
    return p
```
곱셈과 덧셈의 횟수는 모두 $n$이다.


## Problem Reduction
- 문제를 이미 해결방법을 알고 있는 다른 문제로 바꾸어 해결한다.
- 문제를 변형하는 시간과 변형된 문제를 해결하는 시간이 기존의 문제를 해결하는 시간보다 효율적이어야한다.
- Examples
  - $lcm(m,n)$을 $gcm(m,n)$을 구해 해결한다.
  - 그래프에서 길이가 $n$인 경로의 갯수를 인접행렬의 $n$제곱을 이용해 구할 수 있다.
  - 최대값 문제와 최솟값 문제를 서로 변형한다. 

### Computing the Least Common Multiple
- `GCD`를 구하는 매우 효율적인 알고리즘인 유클리드 알고리즘을 이용하여 구한다.
$$lcm(m,n) = {{m \cdot n}\over{gcd(m,n)}}$$

### Countingn Paths in a Graph
- 두개의 정점 사이의 경로의 갯수를 구하는 문제
- 길이가 $k$인 `i`번째 정점에서 `j`번째 정점으로 가는 경로의 갯수는 $A$가 인접 행렬일 때 $A^k$의 `(i,j)`번째 요소와 같다.

### Reduction of Optimization problems
- maximization problem : 어떤 함수의 최댓값을 찾는 문제
- minimization problem : 어떤 함수의 최솟값을 찾는 문제
- $\min f(x)=-\max [-f(x)]$
  
#### Linear Programming
- 어떤 선형 방정식과 선형 부등식을 만족하는 여러 변수의 선형 함수를 최적화하는 문제
- 많은 optimal decision making 문제는 linear programming problem으로 ruduced 될 수 있다.

### Reduction to Graph Problems
- 많은 문제들이 그래프 문제로 reduction 될 수 있다.
- 정점은 가능한 `states`를 나타낸다.
- 간선은 각 정점들 사이의 `transitions`를 나타낸다.
- `initial state`를 `goal state`로 찾아가는 문제이다.
- 이 그래프는 `state-space graph`라고 부른다.