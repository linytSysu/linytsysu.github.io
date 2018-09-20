---
layout: post
title: Machine Learning - Logistic Regression
summary:
tags: [machine-learning]
---

### Formula

Sigmoid function:

$$ g(z) = \frac{1}{1+e^{-z}} $$

and it's derivative:

$$ g'(z) = g(z)(1-g(z)) $$

Logistic regression:

$$ h_{\theta}(\boldsymbol{x}) = \frac{1}{1 + e^{-\theta^{T} \boldsymbol{x}}} $$

for label 1 and label 0:

$$ P(y=1 | \boldsymbol{x},\theta) = h_\theta(\boldsymbol{x}) $$

$$ P(y=0 | \boldsymbol{x},\theta) = 1 - h_\theta(\boldsymbol{x}) $$

that is:

$$ P(y | \boldsymbol{x},\theta) = h_\theta(\boldsymbol{x})^y(1 - h_\theta(\boldsymbol{x}))^{1-y} $$

Loss function:

$$ J(\theta) = -\frac{1}{m}\left[ \sum\limits_{j=1}^m y_j \log h_\theta(\boldsymbol{x}_j)+ (1 - y_j)\log(1 - h_\theta(\boldsymbol{x}_j)) \right]$$

Gradient descent:

$$ \theta_i = \theta_i - \alpha\frac{\partial}{\partial\theta_i}J(\theta) $$

Calculate gradient(calculate partial derivative of $$ \theta_i $$):

$$ \frac{\partial}{\partial\theta_i}J(\theta) = \frac{1}{m}\sum\limits_{j=1}^m(h_\theta(\boldsymbol{x}_j) - y_j)x_i^{j} $$

Calculate the $$ \theta $$:

$$ \theta_i = \theta_i - \alpha\frac{1}{m}\sum\limits_{j=1}^m(h_\theta(\boldsymbol{x}_j) - y_j)x_i^{j} $$

### Code

``` python
class LogisticRegression:
    def __init__(self):
        pass

    def sigmoid(self, z):
        return 1.0 / (1.0 + np.exp(np.negative(z)))

    def fit(self, X, y, alpha=0.01, loop=1000):
        n_sample, n_feature = X.shape
        self.theta = np.zeros(n_feature)
        for _ in range(loop):
            hypothesis = self.sigmoid(np.dot(X, self.theta))
            loss = hypothesis - y
            gradient = np.dot(X.T, loss)
            self.theta = self.theta - alpha / n_sample * gradient
        return self

    def predict(self, X):
        return self.sigmoid(np.dot(X, self.theta))
```
