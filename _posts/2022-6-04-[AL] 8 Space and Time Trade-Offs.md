---
title: "[AL] 8. Space and Time Trade-Offs"
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

# Space and Time Trade-Offs
두가지 종류의 space-for-time 알고리즘
1. Input enhancement
   - 문제 해결을 가속화하기 위해 입력을 전처리하여 저장한다.
   - Ex) countingn methods for sorting, string matching algorithms (Boyer-Moore algorithm and Horspool algorithm)
2. Prestructuring
   -  데이터를 더 빠르고 유연하게 접근하기 위해 추가적인 공간을 사용한다.
   -  Ex) Hashing, indexing with B-trees

## Counting sort

### Comparison-counting sort
- Input-enhancement technique
- 정렬을 해야하는 각각의 원소에 대하여 그 원소보다 더 작은 원소의 갯수를 저장한다.
- 이 숫자는 정렬된 리스트에서 그 원소의 위치를 나타낸다.
   <p align="center"><img src="/assets/img/[AL]8/comparisonsorting.png" width="70%" height="70%"></p>
```
ALGORITHM ComparisonCountingSort(A[0..n-1])
    //Sorts an array by comparison counting
    //Input: An array A[0..n-1] of orderable elements
    //Output: Array S[0..n-1] of A's elements sorted in nondecreasing order
        for i <- 0 to n-1 do Count[i] <- 0
        for i <- 0 to n-2 do
            for j <- i+1 to n-1 do
                if A[i] < A[j]
                    Count[j] <- Count[j] + 1
                else
                    Count[i] <- Count[i] + 1
        for i <- 0 to n-1 do S[Count[i]] <- A[i]
        return S
```
- The number of key comparison 
  $$C(n)=\sum^{n-2}_{i=0}\sum^{n-1}_{j=i+1} 1 = \sum^{n-2}_{i=0}[(n-1)-(i+1)+1]=\sum^{n=2}_{i=0}(n-1-i) = {n(n-1) \over 2}
- 선택정렬과 같은 횟수 만큼 key를 비교한다.
- 입력의 크기만큼 추가 공간이 필요하다.
- key의 이동 횟수를 최소화하여 정렬된 배열을 얻을 수 있다.
- Counting idea는 입력된 원소들이 범위를 알고 있는 작은 집합의 값들일 때 생산적으로 작동한다.

### Distribution-counting sort
```
ALGORITHM DistributionCountingSort(A[0..n-1], l, u)
    //Sorts an array of integers from a limited range by  distribution counting
    //Input: An array A[0..n-1] of integers between l and u (l <= u)
    //Output: Array S[0..n-1] of A's elements sorted in nondecreasing order
        for j <- 0 to u-l do D[j] <- 0
        for i <- 0 to n-1 do D[A[i]-1] <- D[A[i]-l] + 1
        for j <- 1 to u-1 do D[j] <- D[j-1] + D[j]
        for i <- n-1 downto 0 do
            j <- A[i] - l
            S[D[j]-1] <- A[i]
            D[j] <- D[j] - 1
        return S
```

## String matching problem
Input-enhancement idea
- 패턴을 전처리하여 정보를 표에 저장한다.
- 주어진 텍스트에서 패턴을 검색할 때 저장된 정보를 이용한다.
- KMP algorithm, Boyer-Moore algorithm, Horspool's algorithm
(KMP는 앞에서 부터 비교, Boyer-Moore는 뒤에서 부터 비교)

### Horspool'a Algorithm
- 패턴의 오른쪽에서 왼쪽으로 이동하며 텍스트의 부분문자열과 비교한다.
- 텍스트의 부분문자열과 패턴이 일지하지 않을 때 패턴과 일치하는 부분문자열을 빠트리지 않으면서 패턴을 가장 많이 이동시킨다.
- Horspool's algorithm에선 패턴을 이동시킬 거리를 패턴의 가장 마지막 글자와 대응되는 텍스트의 글자 `c`를 보고 결정한다. (가장 처음 비교하는 글자)
  - Case 1: `c`가 패턴에 없는 글자 일 때
    <p align="center"><img src="/assets/img/[AL]8/hpcase1.png" width="70%" height="70%"></p>
    - 패턴의 길이만큼 이동한다.
    
  - Case 2: mismatch가 패턴의 마지막 글자에서 발생했고 `c`가 패턴에 존재할때
    <p align="center"><img src="/assets/img/[AL]8/hpcase2.png" width="70%" height="70%"></p> 
    - 패턴의 가장 오른쪽에 있는 `c`의 위치가 mismatch가 일어난 위치에 오도록 이동시킨다.
    
  - Case 3: mismatch가 중간에서 일어났고 `c`가 다른 위치에 없는 경우
    <p align="center"><img src="/assets/img/[AL]8/hpcase3.png" width="70%" height="70%"></p>
    - 패턴의 길이만큼 이동한다.
  - Case 4: mismatch가 중간에서 일어났고 `c`가 다른 위치에 존재할 때
    <p align="center"><img src="/assets/img/[AL]8/hpcase4.png" width="70%" height="70%"></p>
    - 마지막을 글자를 제외한 가장 오른쪽에 있는 `c`가 mismatch가 일어난 위치에 오도록 이동시킨다.

#### Shift table
Input-enhancement가 불필요한 비교를 반복해서 하지 않도록 한다.
- `shift table`에 이동해야하는 크기를 사전에 저장한다.
- `shift table`은 패턴에 나오는 글자 뿐만아니라 텍스트에 나올 수 있는 모든 글자들에 대한 정보를 포함한다.
- $t(c)$
  - 패턴의 길이 $m$ (`c`가 패턴의 마지막 글자를 제외한 $m-1$개의 글자에 포함되이 않는 경우)
  - 패턴의 가장 마지막 글자와 `c`와의 거리 (`c`가 패턴의 마지막 글자를 제외한 $m-1$개의 글자에 포함되어 있는 경우)

```
ALGORITHM shiftTable(P[0..m-1])
    //Fills the shift table used by Horspool's and Boyer-Moore algorithms
    //Input: Parttern P[0..m-1] and an alphabet of possible characters
    //Output: Table[0..size-1] indexed by the alphabet's characters and filled with shift sizes computed by t(c)
    for i <- 0 to size-1 do Table[i] <- m
    for j <- to m-2 do Table[P[j]] <- m-1-j
    return Table
```

#### Horspool's Algorithm
- Step 1: 주어진 패턴과 텍스트를 이용하여 `shift table`을 만든다. 
- Step 2: 텍스트의 시작위치에 패턴을 나열한다.
- Step 3: 패턴과 일치한 부분물자열을 찾거나 텍스트의 마지막 글자에 도달할 때 까지 다음 실행을 반복한다.
  - 패턴의 마지막 글자부터 패턴과 텍스트를 비교하고 일치하는 부분 문자열을 찾으면 멈춘다.
  - mismatch가 일어나면 `shitf table`의 $t(c)$ 값 만큼 패턴을 오른쪽으로 이동시킨다.

```
Algorithm HorspoolMatching(P[0..m-1], T[0..n-1])
    //Implements Horspool's algorithm for string matching
    //Input: Pattern P[0..m-1] and text T[0..n-1]
    //Output: The index of the left end of the first matching substring or -1 if there are no matches
    ShiftTable(P[0..m-1])   //generate Table of shifts
    i <- m-1                //position of the pattern's right end
    while i <= n-1 do
        k <- 0              //number of matched characters
        while k <= m-1 and P[m-1-k] = T[i-k] do
            k <- k+1
        if k=m
            return i-m+1
        else
            i <- i + Table[T[i]]
    return -1
```

- worst-case efficiency: $O(mn)$
- for random texts: $\theta(n)$
- Boyer-Moore algorithm 만큼 효율적이다.
- 자연어와 유사한 문자열을 다룰 때 간단한 Horspool's algorithm을 더 선호한다.

### Boyer-Moore Algorithm
Horspool's algorithm과 같이 패턴의 오른쪽에서 왼쪽으로 이동하면서 텍스트와 비교한다.
두가지 방법으로 shift size를 계산한다.
- Bad-symbol table
  - mismatch가 일어난 글자를 기준으로 이동할 정도를 나타낸다.
- Good-suffix table
  - 패턴의 일치된 부분(suffix)을 기준으로 이동할 정도를 나타낸다.
패턴의 가장 오른쪽 글자가 텍스트와 일치하지 않는다면 Horspool's algorithm과 같다.

#### Bad-symbol shift in Boyer-Moore algorithm
패턴의 글자가 양수 $k$ $(0 < k < m)$개 만큼 일치한 후 mismatch가 발생하는 경우
- `c`는 mismatch가 일어난 텍스트의 글자를 의미한다.
- $d_1=max[t_1(c)-k, 1]$
- Example pattern: `BBARBER`

  |A|B|E|R|*|
  |-|-|-|-|-|
  |4|2|1|3|6|

   <p align="center"><img src="/assets/img/[AL]8/badsymbol1.png" width="70%" height="70%"></p> 
  
  $$t_1(S)-2=6-2=4\ positions$$

    <p align="center"><img src="/assets/img/[AL]8/badsymbol2.png" width="70%" height="70%"></p> 
  
  $$t_1(A)-2=4-2=4\ positions$$

#### Good-shuffix shift in Boyer-Moore algorithm
패턴의 글자가 양수 $k$ $(0 < k < m)$개 만큼 일치한 후 mismatch가 발생하는 경우 길이가 $k$인 `suffix`에 대하여
- $d_2(k)$ 
  1. 패턴 안에 `suffix`와 동일한 부분문자열이 존재하고 부분문자열의 바로 앞 글자는 `suffix`의  앞 글자와 다를 때
    - `suffix`가 길이가 $k$인 매치된 `suffix`가 동일하고 그 다음 글자는 다른 가장 오른쪽에 있는 `substring`과 `suffix`와의 거리
     - Example : `CABABA` 
       - $d_2(1)=4$
  2. `1.` 에서 정해지지 않으면
     - $k$를 줄여가며 `suffix`를 만들고 같은 길이의 `prefix`와 일치할때 일치하는 글자 사이의 거리
     - Example : `WOWWOW`
     - $d_2(2)=5$, $d_2(3)=3$, $d_2(4)=3$, $d_2(5)=3$
  3. `2.` 에서 정해지지 않으면 
     - $m$ 
 
##### Example

|k|pattern|$d_2$||k|pattern|$d_2$|
|-|-------|-----|-|-|-------|-----|
|1|DBC***B***AB|2||1|ABC***B***AB|2|
|2|DBCBAB|6||2|***AB***CBAB|4|
|3|DBCBAB|6||3|***AB***CBAB|4|
|4|DBCBAB|6||4|***AB***CBAB|4|
|5|DBCBAB|6||5|***AB***CBAB|4|




#### Boyer-Moore ALgorithm
<p align="center"><img src="/assets/img/[AL]8/BM.png" width="70%" height="70%"></p> 

## Hasing
- 사전을 구현하는 매우 효율적인 방법이다.
- 사전은 추상적인 데이터 유형의 검색, 삽입 및 삭제 작업이 정의된 집합이다.
- `Hasing`은 `hash table`이라고 불리는 1차원 배열 H[0.m-1] 사이에 `key`를 분배하는 아이디어에 기초한다.
- 분배는 각 키에 대해 `hash function`라고 불리는 미리 정의된 함수 h의 값을 계산함으로써 이루어진다.
  - 이 함수는 $0$과 $m-1$ 사이의 정수`hash address`를 `key`에 할당한다.

### Hash function
- Example: if keys are nonnegative integers
  - Hash function: $h(K)=K\ \rm{mod}$ $m$

- Example: if keys are letters of some alphabet
  - Hash function: $h(K)=\rm{ord}(K)\ \rm{mod}$ $m$

- Example: if key is a character string
  - Hash function: $h \larr 0;$ $\rm for$ $i\ \larr0$ to $s-1$ $\rm do$ $h \larr (h*C+\rm{ord}($$c_i))$ $\rm{mod}$$\ m$
    - Where $C$ is a constant

- `hash table`의 크기는 키의 수에 비해 지나치게 커서는 안 되지만, 구현의 `time efficiency`를 위태롭게 하지 않을 정도로 충분해야 한다.
- `hash function`는 `hash function`의 셀들 사이에 키를 가능한 한 균등하게 분배해야 한다.
- `hash function`는 계산하기 쉬워야 한다.

### Collision
두 개 이상의 `key`가 `hash table`의 동일한 셀로 해시되는 현상이다. 적절하게 선택된 해시 테이블 크기와 좋은 해시 함수를 사용하면, 이러한 상황은 매우 드물게 발생한다. 그러나 모든 `hash` 체계에는 충돌 해결 메커니즘이 있어야 한다.
- `open hashing` (`separate chaining`)
  - `Key`를 `linked list`에 저장하고 `hash table`에 각 `linked list`의 `header`의 주소를 저장한다.
  <p align="center"><img src="/assets/img/[AL]8/openhashing.png" width="70%" height="70%"></p> 
- `closed hashing` (`open addressing`)
  - Linear probing
    - 셀이 비어 있으면 새 키가 저장된다.
    - 충돌이 발생한 셀 다음에 오는 셀을 확인한다.
    - 다음 셀이 이미 사용 중인 경우 해당 셀의 다음 셀을 확인한다.
    - 마지막에 도달하면 처음으로 돌아간다.
  - 키를 검색하려면
    - 셀 $h(K)$가 비어 있으면 검색에 실패합니다.
    - 셀이 비어 있지 않으면 $K$를 셀에 있는 `key`와 비교해야 한다. 동일하지 않으면 $K$를 다음 셀의 `key`와 비교하고 일치하는 `key`(성공한 검색) 또는 빈 셀(성공하지 못한 검색)이 나타날 때까지 이러한 방식으로 계속합니다.
  -  Deletion:`lazy deletion`을 사용한다.

### Hashing vs. balanced search trees
- Asymptotic time efficiency
  - `Hashing`: 평균적으로 `searching`, `insertion`, and `deletion` $\Theta(n)$이지만 최악의 경우 $\Theta(n)$
  - `Balanced search tree`: 평균과 최악 모두 $\Theta(\log n)$ 
- 순서 유지 
  - `Hashing`: `key` 순서가 있는 것으로 가정하지 않으며 일반적으로 `key` 순서가 유지되지 않는다. `key`를 순서대로 반복해야 하거나 하한과 상한 사이의 `key` 개수 계산이 필요한 작업에 `Hashing`은 적합하지 않는다.
  - `Balanced search tree`: 순서를 유지한다.
