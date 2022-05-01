---
title: "[AL] 3. Fundamentals of the Analysis of Algorithm Efficiency"
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

## Efficiency
- 시간 효율성 (시간 복잡도) : 문제에서 알고리즘이 얼마나 빨리 실행되는지를 의미한다.
- 공간 효율성 (공간 복잡도) : 입출력에 필요한 공간 외에 알고리즘에 필요한 메모리 단위의 양을 의미한다.
현재 일반적으로 알고리즘에 필요한 추가 공간의 양은 크게 중요하지 않다. 대부분의 문제에서 공간보다 속도에서 훨씬 더 눈부신 발전을 이룰 수 있다.

## Time efficiency

### Measuring an algorithm’s running time
- 프로그램의 실행시간 측정
  - 특정 컴퓨터의 속도에 의존
  - 알고리즘을 구현하는 프로그램의 성능과 기계 코드를 생성하는 데 사용되는 컴파일러의 성능에 의존된다.
  - 프로그램의 실제 실행 시간을 측정하는 것은 어렵다.
- `basic operation`이 실행되는 횟수를 세는 방법
  - 알고리즘의 `basic operation`을 확인하고 이것이 실행되는 횟수를 계산한다.
  - `Basic operation` : 총 실행 시간에 가장 많이 기여하는 작업 (일반적으로 일고리즘의 가장 안쪽 루프에서 가장 시간이 많이 걸리는 작업)
    - Example
      - 정렬 알고리즘에서의 `key comparision`
      - 수학적 문제에서의 사칙연산

### $T(n)$

$n$ : input size, $T(n)$ : running time,  $c_{op}$ : execution time for basic operation, $C(n)$ : Number of times basic operation is executed
$$
T(n) \approx c_{op}C(n)
$$

### Efficiency on particular input
- 특정 입력에 따라 효율성이 달라지는 알고리즘이 있다. 
  - Sequencial search

- The worst-case efficiency $C_{worst}(n)$
  - 크기가 `n`인 모든 입력 중 가장 느리게 실행회는 worst-case의 efficiency.
  - 크기가 `n`인 입력에 대해 실행시간이 $C_{worst}(n)$를 초과하지 않음을 보장한다.
- The best-case efficiency $C_{best}(n)$
  - 크기가 `n`인 모든 입력 중 가장 빠르게 실행되는 best-case의 efficiency.
  - best-case efficiency에 대한 분석은 worst-case efficiency에 대한 분석만큼 중요하진 않지만 완전히 쓸모 없는 것은 아니다.
- The average-case efficiency $C_{avg}(n)$
  - average-case efficiency는 best-case 및 worst-case의 efficiency 조사보다 상당히 어렵다.


#### Sequencial search
Pseudo code
```
Algorithm SequentialSearch(A[0..n-1], K)
    i <- 0
        while i<n and A[i]!=K do
            i <- i+1
    if i < n return i
    else return -1

```

- $C_{worst}(n) = n$
- $C_{best}(n) = 1$
- $C_{avg}(n)$ 
  - $\sum_{i=1}^{n}({p \over n}i)+n(1-p) =  {p(n+1) \over 2}+n(1-p)$
  - if $p=1$, $C_{avg}(n) = {n+1 \over 2}$
  - if $p=0$, $C_{avg}(n) = n$


### Asymptotic order of growth
#### $O(g(n))$
$g(n)$보다 작거나 같은 증가율 가진 함수들의 집합
![bigO](/assets/img/%5BAL%5D3/BigO.png){: width="70%" height="70%"}



$$t(n) \in O(g(n))$$

$$^\exists c>0 \quad s.t. \quad t(n) \le cg(n) \ for \ all \ n \ge n_0$$


#### $\Omega(g(n))$
$g(n)$보다 크거나 같은 증가율 합수들의 집합

![bigOmega](/assets/img/%5BAL%5D3/BigOmega.png){: width="70%" height="70%"}

$$t(n) \in \Omega(g(n))$$

$$^\exists c >0 \quad s.t. \quad t(n) \ge cg(n) \quad for \ \  all \ \  n \ge n_0$$


#### $\Theta(g(n))$
![bigTheta](/assets/img/%5BAL%5D3/BigTheta.png){: width="70%" height="70%"}


$g(n)$과 같은 증가율을 가진 함수들의 집합

$$t(n) \in \Theta(g(n))$$

$$^\exists c_1, \ c_2>0 \quad s.t. \quad  c_1g(n) \le t(n) \le c_2g(n) \quad for \ \  all \ \  n \ge n_0$$

#### Using limits for comparing orders of grouth

$$\lim_{n\rightarrow \infty}=\begin{cases}0\quad implies\ that\ t(n)\ has \ a\ smaller\ order\ of\ growth\ than\ g(n)\\c \quad implies\ that\ t(n)\ has \ the\ same\ order\ of\ growth\ as\ g(n) \\\infty \quad implies\ that\ t(n)\ has \ a\ larger\ order\ of\ growth\ as\ g(n) \end{cases}$$

- 첫번째 두 경우는 $t(n) \in O(g(n))$을 의미한다
- 마지막 두 경우는  $t(n) \in \Omega(g(n))$을 의미한다
- 두번째 경우는  $t(n) \in \Theta(g(n))$을 의미한다

### Nonrecursive algorithms

#### Example 1: Maximum element
- Pseudo code
    ```
    ALGORITHM MaxElement(A[0...n-1])
        maxval <- A[0]
        for i <- 1 to n-1 do
            maxval <- A[i]
        return maxval
    ```
- Input size : the numver of elements in the array, n
- Basic operation : comparison
- 
$$C(n) = \sum^{n-1}_{i=1}1=n-1\in\Theta(n)$$

#### Example 2: Element uniqueness problem
- Pseudo code
    ```
    ALGORITHM UniqueElements(A[0...n-1])
        for i <- 0 to n-2 do
            for j <- i+1 to n-1 do
                if A[i] = A[j] return false
        return true
    ```
- Input size : the numver of elements in the array, n
- Basic operation : comparison
- The worst cases:
  - 배열에 같은 원소가 없는 경우
  - 마지막 두 원소가 같은 경우
$$C_{worst}(n) = \sum^{n-2}_{i=0}\sum_{j=i+1}^{n-1}1=\sum^{n-2}_{i=0}(n-i-1)={n(n-1)\over2}\approx{1\over2}n^2\in\Theta(n^2)$$




#### Example 3: Matrix multiplication
<p align="center">
	<img src="/assets/img/%5BAL%5D3/matrix.png" alt="kingdom" width="70%" height="70%"/>
</p>
- Pseudo code
    ```
    ALGORITHM MatrixMultiblication(A[0...n-1])
        for i <- 0 to n-1 do
            for j <- 0 to n-1 do
                C[i,j] <- 0.0
                for k <- 0 to n-1 do
                    C[i,j] <- C[i,j] + A[i,k]*B[k,j]
        return C
    ```
- Input size : the numver of elements in the array, n
- Basic operation : multiplication and addition

<center>$$M(n) = \sum^{n-1}_{i=0}\sum^{n-1}_{j=0}\sum^{n-1}_{k=0}= \sum^{n-1}_{i=0}\sum^{n-1}_{j=0}n=\sum^{n-1}_{i=0}n^2=n^3$$
$$T(n) \approx c_mM(n)+c_aM(n)=(c_m+c_a)n^3$$</center>

#### Example 4: Counting binary digits
- Pseudo code
    ```
    ALGORITHM Binary(n)
        count <- 1
        while n>1 do
            count <- count+1
            n <- ⌊n/2⌋
        return count
    ```
- Basic operation : comparison
- The total number of comparison : $\lfloor \log_2n\rfloor+1$

### Recursive algorithms

#### Example 1: Maximum element
- Pseudo code
    ```
    ALGORITHM F(n)
        if n=0 return 1
        else return F(n-1) * n
    ```
- Input size : n
- Basic operation : multiplication
$$M(n) = M(n-1) + 1 \quad  for \quad n>0,\quad M(0) =0$$
$$M(n) = M(n-1) + 1 =\ \cdots\ = M(n-n)+n=n$$

#### Example 2: Tower of Hanoi puzzle
![hanoi](/assets/img/%5BAL%5D3/hanoi.png){: width="70%" height="70%"}
- Input size : the number of disks, n
- Basic operation : moving one disk
  
$$M(n) = 2M(n-1) + 1 \quad  for \quad n>1, \quad M(1)=1$$
$$M(n) = 2M(n-1) + 1 = 2[2M(n-2) + 1]+1 =\ \cdots\ = 2^{n-1}M(n-(n-1))+2^{n-1}-1=2^n-1$$

#### Example 3: Counting binary digits (recursion)
- Pseudo code
    ```
    ALGORITHM BinRec(n)
        if n=1 return 1
        else return BinRec(⌊n/2⌋)+1
    ```
- The total number of additions : $A(n)$
- Recurrence : $A(n) = A(\lfloor {n\over2} \rfloor ) + 1$ for $n>1$
- Initial condition: $A(1)=0$
- Smoothness rule

$$n=2^k\quad\quad$$

$$A(2^k)=A(2^{k-1})+1\quad for\quad k>0,\quad A(2^0)=0$$

$$A(2^k) = A(2^{k-k})+k = A(1) + k = k$$

$$n=2^k,\quad k=\log_2n$$

$$A(n) = \log_2n\in\Theta(\log n)$$

#### Example 4: Computing the nth Fibonacci number
- Pseudo code
    ```
    ALGORITHM F(n)
        if n<=1 return n
        else return F(n-1) + F(n-2)
    ```
- Basic operation : addition
- The total number of additions : $A(n)$
  - $A(2^k)=A(n-1)+A(n-2)+1\quad for\quad n>1$

    $A(0)=0,\quad A(1)=0$

    $A(n) - A(n-1)-A(n-2)=1$

    $[A(n)+1]-[A(n-1)+1]-[A(n-2)+1]=0$

    $B(n) = A(n)+1$

    $B(n) - B(n-1)-B(n-2)=0,\quad B(0)=1,\quad B(1)=1$

    $B(n)={1\over \sqrt5}(\phi ^{n+1} - \hat\phi^{n+1} )$

    $A(n)={1\over \sqrt5}(\phi ^{n+1} - \hat\phi^{n+1} )-1 \in\Theta(\phi^n)$ 

- $\Theta(\log n)$ algorithm
  - 
  $$\left[\begin{matrix}F(n-1) & F(n) \\ F(n) & F(n+1)\end{matrix}\right] = \left[ \begin{matrix}0&1\\1&1\end{matrix}\right]^n$$
  for $n\ge1$


