---
layout: post
title: Machine Learning - Gaussian Naive Bayes
summary:
tags: [machine-learning]
---

### Formula

According to Bayes' theorem:

$$ P(y \mid x_1,x_2,...,x_n)=\frac{P(y)P(x_1,x_2,...,x_n \mid y)}{P(x_1,x_2,...,x_n)} $$

Using the naive conditional independence assumption that

$$ P(x_i\mid y,x_1,...,x_i,x_{i+1}, ...,x_n) = P(x_i \mid y) $$

for all $$ i $$ , this relationship is simplified to

$$ P(y\mid x_1,x_2,...,x_n)=\frac{P(y)\prod_{i=1}^{n}P(x_i\mid y)}{P(x_1,x_2,...,x_n)} $$

Since $$ P(x_1,x_2,...,x_n) $$ is constant given the input, we can use the following classification rule:

$$ P(y \mid x_1,x_2,...,x_n) \propto = P(y)\prod_{i=1}^{n}P(x_i\mid y) $$

$$ \hat{y} = \arg\max_y P(y) \prod_{i=1}^{n} P(x_i \mid y) $$

The different naive Bayes classifiers differ mainly by the assumptions they make regarding the distribution of $$ P(x_i \mid y) $$.

For Gaussian Naive Bayes, the likelihood of the features is assumed to be Gaussian:

$$ P(x_i \mid y) = \frac{1}{\sqrt{2\pi\sigma^2_y}} \exp\left(-\frac{(x_i - \mu_y)^2}{2\sigma^2_y}\right) $$

### Code

``` python
class GaussianNB:
    def __init__(self):
        pass

    def fit(self, X, y):
        n_features = X.shape[1]
        unique_y = np.unique(y)
        n_classes = unique_y.shape[0]

        self.mu = np.zeros((n_classes, n_features))
        self.var = np.zeros((n_classes, n_features))
        self.priors = np.zeros(n_classes)

        for y_i in unique_y:
            i = unique_y.searchsorted(y_i)
            X_i = X[y == y_i, :]
            self.mu[i, :] = np.mean(X_i, axis=0)
            self.var[i, :] = np.var(X_i, axis=0)
            self.priors[i] = float(len(X_i)) / len(X)
        return self

    def predict(self, X):
        n_samples = X.shape[0]
        y_pred = np.zeros(n_samples)
        for i in range(n_samples):
            density = (1.0 / np.sqrt(2 * np.pi * self.var)) * np.exp(-(((X[i] - self.mu) ** 2) / (2 * self.var)))
            prob_desity = np.multiply(np.multiply.reduce(density, axis=1), self.priors)
            y_pred[i] = np.argmax(prob_desity)
        return y_pred
```
