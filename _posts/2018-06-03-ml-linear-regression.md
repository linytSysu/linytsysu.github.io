---
layout: post
title: Machine Learning - Linear Regression
summary:
tags: [machine-learning]
---

## Formula

Linear regression:

$$ h_\theta(x_1, x_2, \ldots, x_n) = \theta_0 + \theta_1 x_1 + \ldots + \theta_n x_n $$

add $$ x_0 = 1 $$,

$$ h_\theta(x_0, x_1, \ldots, x_n) = \theta_0 x_0 + \theta_1 x_1 + \ldots + \theta_n x_n $$

Loss function:

$$ J(\theta) = \frac{1}{2m} \sum\limits_{i=1}^m(h_\theta(x_i) - y_i)^2 $$

Gradient(partial derivative of $$ \theta_j $$):

$$ \frac{\partial}{\partial\theta_j}J(\theta) $$

Gradient descent:

$$ \theta_j = \theta_j - \alpha\frac{\partial}{\partial\theta_j}J(\theta) $$

Calculate gradient(calculate partial derivative of $$ \theta_j $$):

$$ \frac{\partial}{\partial\theta_j}J(\theta)= \frac{1}{m}\sum\limits_{i=1}^{m}(h_\theta(x_i) - y_i)x_i^{j} $$

Calculate the $$ \theta $$:

$$ \theta_j = \theta_j - \alpha\frac{1}{m}\sum\limits_{i=1}^{m}(h_\theta(x_i) - y_i)x_i^{j} $$

## Code

``` python
class LinearRegression:
    def __init__(self):
        pass

    def fit(self, X, y, alpha=0.01, loop=1000):
        m, n = X.shape
        self.theta = np.zeros(n)
        for _ in range(loop):
            hypothesis = np.dot(X, self.theta)
            loss = hypothesis - y
            gradient = np.dot(X.T, loss)
            self.theta = self.theta - alpha / m * gradient
        return self

    def predict(self, X):
        return np.dot(X, self.theta)
```
