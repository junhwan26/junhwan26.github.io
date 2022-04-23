---
title: 3 Discrete Random Variables and Their Probability Distributions
description: Mathematical Statistics - 7th Edition - Wackerly
categories:
 - Statistics
tags: MathematicalStatistics 
---

# 3 Discrete Random Variables and Their Probability Distributions

---

## 3.1 Basic DEFINITION
### DEFINITION 3.1
> A random variable **_Y_** is said to be _**discrete**_ if it can assume only a finite or countably infinite number of distinct values 

랜덤 변수 $Y$는 finite하거나 countably infinite한 고유 값만 가정할 수 있는 경우 $discrete$라고 한다.

#### Countably infinite
 > A set is countably infinite if its elements can be put in one-to-one correspondence with the set of natural numbers. 

 원소들이 자연수들의 집합과 일대일 대응에 놓일 수 있다면 그 집합은 countably infinite하다.

 Countably infinite하다는 것은 우리가 영원히 셀 수 없을 정도로 큰 집합을 설명하는 것과 대조적이다. finite sets을 포함하지 않는 다는 것을 강조할 때 사용한다.

---

## 3.2 The Probability Distribution for a Discrete Random Variable

### DEFINITION 3.2
> The probability that $Y$ takes on the value $y$, $P(Y = y)$, is defined as the sum of the probabilities of all sample points in S that are assigned the value y. We will sometimes denote $P(Y = y)$ by $p(y)$.

$Y$가 $y$를 값으로 가질 확률 $P(Y = y)$는 $y$를 값으로 가지는 모든 표본점의 확률의 합으로 정의된다. 

#### sample point (표본점)
>a single possible observed value of a variable.
변수가 가질 수 있는 단일 관측치

### DEFINITION 3.3
> _The probability distribution_ for a discrete variable $Y$ can be represented by a formula, a table, or a graph that provides $p(y) = P(Y = y)$ for all $y$.

이산형 변수 $Y$에 대한 확률 분포는 모든 Y에 대해 $p(y) = P(Y = y)$를 규정하는 공식, 표 또는 그래프로 나타낼 수 있다.

### THEOREM 3.1
> For any discrete probability distribution, the following must be true:
> 1. $0≤ p(y)≤1$ for all $y$.
> 2. $\sum_y p(y) = 1$, where the summation is over all values of $y$ with nonzero probability

--- 

## 3.3 The Expected Value of a Random Variable or a Function of a Random Variable

### Dfinition 3.4
> Let $Y$ be a discrete random variable with the probability function $p(y)$. Then the expected value of $Y$ , $E(Y)$, is defined to be
> $$ E(Y)=\sum yp(y).$$


### THEOREM 3.2
> Let $Y$ be a discrete random variable with probability function $p(y)$ and $g(Y)$ be a real-valued function of $Y$. Then the expected value of $g(Y)$ is given by
> $$ E[g(Y)] = \sum_{all\ y} g(y)p(y).$$


### DEFINITION 3.5
> If $Y$ is a random variable with mean $E(Y) = μ$, the variance of a random variable $Y$ is defined to be the expected value of $(Y − μ)^2$. That is,
> $$V (Y) = E [(Y − μ)^2].$$
> The *standard deviation* of $Y$ is the positive square root of $V (Y )$.

### THEOREM 3.3
> Let $Y$ be a discrete random variable with probability function $p(y)$ and c be a constant. Then $E(c) = c$. 

### THEOREM 3.4
> Let $Y$ be a discrete random variable with probability function $p(y)$, $g(Y)$ be a function of $Y$ , and c be a constant. Then
> $$ E[cg(Y)] = cE[g(Y)].$$

### THEOREM 3.5
> Let $Y$ be a discrete random variable with probability function $p(y)$ and $g_1(Y ), g_2(Y),..., g_k(Y)$ be $k$ functions of $Y$. Then
>$$ E [g_1 (Y ) + g_2 (Y ) + · · · + g_k (Y )] = E [g_1 (Y )] + E [g_2 (Y )] + · · · + E [g_k (Y )]. $$

### THEOTEM 3.6
> Let $Y$ be a discrete random variable with probability function $p(y)$ and mean $E(Y) = μ$; then
>$$ V(Y)=σ^2 = E[(Y −μ)^2]= E(Y^2)−μ^2.$$

---
## 3.4 The Binomial Probability Distribution

### DEFINITION 3.6
> A binomial experiment possesses the following properties:
>1.  The experiment consists of a fixed number, $n$, of identical trials.
>2. Each trial results in one of two outcomes: success, $S$, or failure, $F$.
>3. The probability of success on a single trial is equal to some value $p$ and remains the same from trial to trial. The probability of a failure is equal to $q = (1 − p)$.
>4. The trials are independent.
>5. The random variable of interest is $Y$ , the number of successes observed during the $n$ trials.

이항 실험의 특성

1. 실험은  고정된 n개의 동일한 시행으로 구성된다.
2. 각 시행의 결과는 성공, $S$ 또는 실패, $F$의 두 가지 결과 중 하나이다.
3. 각 시행에서 에서 성공할 확률은 어떤 값 $p$와 같다.같은 시행에서 실패 확률은 $q = (1 - p).$ 이다.
4. 각 시행은 독립이다.
5. 관심 랜덤 변수는 Y이며, $n$개의 시행 중 관찰된 성공 횟수입니다.

### DEFINITION 3.7
> A random variable $Y$ is said to have a binomial distribution based on n trials with success probability p if and only if
> $$ p(y)= {n\choose y}p^yq^{n−y},\qquad  y=0,1,2,...,\ n\ and\ 0≤p≤1.$$

### THEOREM 3.7
> Let $Y$ be a binomial random variable based on $n$ trials and success probability $p$. Then
> $$μ=E(Y)=np\quad and\quad σ^2 =V(Y)=npq.$$

---

## 3.5 The Geometric Probability Distribution

### DEFINITION 3.8
>A random variable $Y$ is said to have a geometric probability distribution if and only if
>$$p(y)=q^{y−1}p,\quad y=1,2,3,...,\quad 0≤p≤1.$$

### THEOREM 3.8
> If $Y$ is a random variable with a geometric distribution,
>$$μ=E(Y)={1\over p} \quad and \quad σ^2=V(Y)={1−p \over p^2}.$$

## 3.6 The Negative Binomial Probability Distribution

### DEFINITION 3.9
>A random variable Y is said to have a ***negative binomial probability distribution*** if and only if
>$$p(y)= {y-1\choose r-1}p^r q^{y−r},\quad  y=r,r+1,r+2,..., 0≤p≤1.$$

### THEOREM 3.9
> If Y is a random variable with a negative binomial distribution,
> $$ μ=E(Y)= {r \over p}\quad and\quad σ^2=V(Y)= {r(1−p) \over p^2}. $$