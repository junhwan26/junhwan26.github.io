---
title: 4 Continuous Variables and Their Probability Distributions
description: Mathematical Statistics - 7th Edition - Wackerly
categories:
 - Statistics
tags: MathematicalStatistics 
---

# 4 Continuous Variables and Their Probability Distributions

---

## 4.2 The Probability Distribution for a Continuous Random Variable

### DEFINITION 4.1
> Let $Y$ denote any random variable. The distribution function of $Y$ , denoted by $F(y)$, is such that $F(y) = P(Y ≤ y)$ for $−∞ < y < ∞.$

### THEOREM 4.1
> Let Y denote any random variable. The distribution function of $Y$, denoted by $F(y)$, is such that $F(y) = P(Y ≤ y)$ for $−∞ < y < ∞.$

### DEFINITION 4.2
>A random variable $Y$ with distribution function $F(y)$ is said to be continuous if $F(y)$ is continuous, for $−∞ < y < ∞.$

### DEFINITION 4.3
>Let $F(y)$ be the distribution function for a continuous random variable $Y$. Then $f(y)$, given by
$f(y)= dF(y)= {dF^′(y) \over dy}$
wherever the derivative exists, is called the probability density function for the random variable $Y$ .

### THEOREM 4.2
>**Properties of a Density Function** If $f(y)$ is a density function for a continuous random variable, then
>1. $f(y) ≥ 0$ for all $y$, $−∞<y<∞.$
>2. $\int_{-∞}^{∞} f(y)dy=1.$

### DEFINITION 4.4
> Let $Y$ denote any random variable. If $0 < p < 1$, the $p$th ***quantile*** of $Y$, denoted by $\phi_p$, is the smallest value such that $P(Y ≤ \phi_p) = F(\phi_p) ≥ p.$ If $Y$ is continuous, $\phi_p$ is the smallest value such that $F(\phi_p) = P(Y ≤ \phi_p) = p.$ Some prefer to call $\phi_p$ the $100p$th percentile of Y.

### THEOREM 4.3
>If the random variable $Y$ has density function $f (y)$ and $a < b$, then the probability that $Y$ falls in the interval $[a, b]$ is
>$$P(a ≤ Y ≤ b) = \int_{a}^{b}f (y) dy.$$

---

## 4.3 Expected Values for Continuous Random Variables

### DEFINITION 4.5
> The expected value of a continuous random variable $Y$ is 
> $$E(Y) =\int_{-∞}^{∞}yf(y)\ dy$$ 
> provided that the integral exists.

### THEROEM 4.4
> Let $g(Y )$ be a function of $Y$ ; then the expected value of $g(Y )$ is given by 
> $$E [g(Y )] = \int_{-∞}^{∞}g(y)f(y)\ dy$$
>provided that the integral exists.

### THEOREM 4.5
>Let $c$ be a constant and let $g(Y), g_1(Y), g_2(Y),...,g_k(Y)$ be functions of a continuous random variable $Y$ . Then the following results hold:
>1. $E(c) = c.$
>2. $E[cg(Y)] = cE[g(Y)].$
>3. $E[g_1(Y)+g_2(Y)+···+gk(Y)] = E[g_1(Y)]+E[g_2(Y)]+···+E[g_k(Y)].$
