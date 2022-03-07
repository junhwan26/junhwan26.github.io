---
title: 5 Multivariate Probability Distributions
description: Mathematical Statistics - 7th Edition - Wackerly
categories:
 - Statistics
tags: MathematicalStatistics 
---

# 5 Multivariate Probability Distributions

---

## 5.6 SpecialTheorems

### THEOREM 5.6
>Let $c$ be a constant. Then
>$$E(c) = c.$$

### THEOREM 5.7
>Let g(Y1,Y2) be a function of the random variables $Y1$ and $Y2$ and let $c$ be a constant. Then
>$$E[cg(Y1, Y2)] = cE[g(Y1, Y2)].$$

### THEOREM 5.8
>Let $Y1$ and $Y2$ be random variables and $g_1(Y_1,Y_2),\ g_2(Y_1,Y_2),\ \cdots,\ g_k(Y_1,Y_2)$ be functions of $Y_1$ and $Y_2$. Then
>$$E[g_1(Y_1,Y_2)\ +\ g2(Y_1,Y_2)\ +\ ···\ +\ g_k(Y_1,Y_2)]
= E[g_1(Y_1,Y_2)]+ E[g_2(Y_1,Y_2)]+\ ···\ +\ E[g_k(Y_1,Y_2)].$$

### THEOREM 5.9
>Let $Y_1$ and $Y_2$ be independent random variables and $g(Y_1)$ and $h(Y_2)$ be functions of only $Y_1$ and $Y_2$, respectively. Then
>$$E[g(Y_1)h(Y_2)] = E[g(Y_1)]E[h(Y_2)],$$
> provided that the expectations exist.

---

## 5.7 The Covariance of Two Random Variables

### DEFINITION 5.10
> If $Y_1$ and $Y_2$ are random variables with means $μ_1$ and $μ_2$, respectively, the covariance of $Y_1$ and $Y_2$ is
>$$Cov(Y_1, Y_2) = E [(Y_1 − μ_1)(Y_2 − μ_2)] .$$

### THEOREM 5.10
>If $Y_1$ and $Y_2$ are random variables with means $μ_1$ and $μ_2$, respectively, then 
>$$Cov(Y_1, Y_2) = E [(Y_1 − μ_1)(Y_2 − μ_2)] = E(Y_1Y_2) − E(Y_1)E(Y_2).$$

### THEOREM 5.11
> If $Y_1$ and $Y_2$ are independent random variables, then 
> $$Cov(Y_1, Y_2) = 0.$$
> Thus, independent random variables must be uncorrelated.


---

## 5.8 The Expected Value and Variance of Linear Functions of Random Variables

### THEOREM 5.12
>Let $Y_1,Y_2,...,Y_n$ and $X_1, X_2,..., X_m$ be random variables with $E(Y_i) = μ_i$ and $E ( X_j ) = ξ_j$. Define
>$$U_1=\sum^{n}_{i=1}a_iY_i\quad and\quad  U_2=\sum^{n}_{j=1}b_jX_j$$
> for constants $a_1,a_2,...,a_n$ and $b_1,b_2,...,b_m.$ Then the following hold:
>   
> **a**&nbsp;&nbsp;&nbsp;&nbsp;$E(U_1)= \sum^n_{i=1}a_iμ_i.$
>
> **b**&nbsp;&nbsp;&nbsp;&nbsp;$V(U_1) = \sum^n_{i=1} a_i^2V(Y_i) + 2\sum\sum_{ 1≤i<j≤n} a_ia_jCov(Y_i,Y_j)$, where the double sum is over all pairs $(i, j)$ with $i < j$.
>
> **c**&nbsp;&nbsp;&nbsp;&nbsp;$Cov(U_1,U_2)=\sum_{i=1}^n\sum_{j=1}^m a_ib_jCov(Y_i,X_j)$.