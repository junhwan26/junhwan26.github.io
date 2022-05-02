---
title: "[AL] 2. Important problem types"
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

## Sorting 
### Sorting을  하는 이유
- 정렬이 출력으로 요구되는 작업이 있다.
  - ex) ranking
- 정렬은 리스트에 대한 질문에 쉽게 대답할 수 있게 해준다
  - ex) searching
- 정렬은 다른 분야의 중요한 알고리즘의 보조 단계로 사용된다.
  - ex) geometric algorithms and data compression

### Sorting 알고리즘의 예
- Selection sort 
- Bubble sort
- Insertion sort
- Merge sort
- Heap sort
- ...
Sorting 알고리즘의 복잡성은 key의 비교 횟수로 평가한다.

### Sorting 알고리즘의 속성
`stable` : 입력에서의 동일한 두 요소의 상대적인 순서가 바뀌지 않는 경우
`in place` : 적은 메모리 단위를 제외한 추가 메모리를 사용하지 않는 경우

### Selection Sort
Input : array `a[1]`,…,`a[n]`

Output :  array a sorted in non-decreasing order

Algorithm: 
```
for i=1 to n 
    swap a[i] with smallest of a[i],…,a[n] 
```
Pseudocode
```
Algorithm SelectionSort(A[0..n-1])
//The algorithm sorts a given array by selection sort
//Input: An array A[0..n-1] of orderable elements
//Output: Array A[0..n-1] sorted in ascending order
for i  0 to n – 2 do
	min  i
	for j  i + 1 to n – 1 do
		if A[j] < A[min] 	
			min  j
	swap A[i] and A[min]
```

## Searching 
- 주어진 집합(또는 여러 요소가 동일한 값을 가질 수 있도록 허용된 다중 집합)에서 주어진 `search key`를 찾는다.

- Example
  - Sequentail search
  - Binary search


## String processing
- `string`: character 배열
- `Text strings`: letters, numbers, and special characters.
- `String matching`: 글에서 주어진 단어나 패턴을 검색


## Graph problems
- 실제 문제 모델링
  - World Wide Web(WWW) 모델링
  - 통신망 모델링
  - 프로젝트 스케줄링
- 기본적인 그래프 알고리즘
  - 그래프 순회 알고리즘
  - 최단거리 알고리즘
  - 위상정렬

## Combinational problems
- 명시적으로나 암묵적으로 순열, 조합, 부분집합과 같은 `combinatorial object`를 찾는것을 요청
- ex) traveling salesman problem (TSP) 
  - N개 도시를 모두 정확히 한 번 방문하는 최단 기간 찾기
- `Combinational` 문제는 이론적 및 실제적 관점에서 컴퓨팅에서 가장 어려운 문제이다.
- `combinatorial object`의 수는 일반적으로 문제의 크기에 따라 매우 빠르게 증가한다.
- 제한된 시간안에 정확하게 푸는 알려진 알고리즘이 없다.


## Geometric problems
- 점, 선, 다각형과 같은 `geometric object`를 다룬다.
  - 응용 : 컴퓨터 그래픽, 로보틱스, 단층 촬영
- Example
  -  The closest-pair problem
  - The convex-hull problem


## Numerical problems
- 연속적인 `mathematical objects`를 포함하는 문제이다.
- 이러한 대부분의 수학적 문제들은 근사적으로만 풀 수 있다.
- 근사된 숫자에 대해 산술 연산을 많이 수행하면 반올림 오차가 누적되어 크게 왜곡될 수 있다.
- Example
  - 방정식
  - 연립방적식
  - 정적분
  - 함수값 계산
