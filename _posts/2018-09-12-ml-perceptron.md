---
layout: post
title: Machine Learning - Perceptron
summary:
tags: [machine-learning]
---

### Formula

For $$ \{(x_1^1, x_1^2,...,x_1^n,y_1), (x_2^1, x_2^2,...,x_2^n,y_2), ..., (x_m^1, x_m^2,...,x_m^n,y_m)\} $$, find hyperplane $$ \theta_0 + \theta_1x_1 + \theta_2x_2 + ... + \theta_nx_n = 0 $$ which can divide the data into two parts.

The percetron can defined as:

$$ \psi(\boldsymbol{x}) = rsign(\theta^T\boldsymbol{x}) $$

where:

$$ rsign(x) = \begin{cases}
    +1, & \text{if $x \geq 0$}\\
    -1, & \text{otherwise}
\end{cases} $$

The distance between $$ x_i $$ and hyperplane is 

$$ \frac{1}{\left\|\theta\right\|_2} \vert \theta^T\boldsymbol{x}_i \vert $$

As we know:

$$ y_i \theta^T\boldsymbol{x}_i < 0 $$

so the distance is:

$$ - \frac{1}{\left\|\theta\right\|_2} y_i \theta^T\boldsymbol{x}_i $$

For error set $$ M $$, we define the loss function:

$$ J(\theta) = - \frac{1}{\left\|\theta\right\|_2} \sum\limits_{(\boldsymbol{x_i}, y_i) \in M} y_i \theta^T\boldsymbol{x}_i \Leftrightarrow - \sum\limits_{(\boldsymbol{x_i}, y_i) \in M} y_i \theta^T\boldsymbol{x}_i $$

Gradient(partial derivative of $$ \theta_i $$):

$$ \frac{\partial}{\partial\theta_i}J(\theta) = -\sum\limits_{(\boldsymbol{x_i}, y_i) \in M} y_i \theta^T\boldsymbol{x}_i $$

Using random gradient descent:

$$ \theta = \theta + \alpha y_i \boldsymbol{x}_i $$

### Dual Form

Assume $$ (\boldsymbol{x}_i, y_i) $$ is used $$ k_i $$ times when update $$ \theta $$, at last $$ \theta $$ is:

$$ \theta_i = \alpha \sum\limits_{i=1}^{m}k_i\boldsymbol{x}_iy_i $$

so if we know $$ k_i $$,

$$ \psi(\boldsymbol{x_i}) = rsign(\alpha \sum\limits_{j=1}^{m}y_jk_j(\boldsymbol{x}_j, \boldsymbol{x}_i)) $$

Then the dual form is updating $$ k_i $$:

$$
\begin{cases}
    k_i = k_i + 1, & \text{if $ y_i \alpha \sum\limits_{j=1}^{m}y_jk_j(\boldsymbol{x}_j, \boldsymbol{x}_i) \leq 0 $} \\
    i = i + 1, & \text{otherwise}
\end{cases}
$$

### Code

``` python
class Perceptron:
    def __init__(self):
        pass

    def fit(self, X, y, alpha=0.001, loop=1000):
        n_sample, n_feature = X.shape
        times = np.zeros(n_sample)
        gram = np.dot(X, X.T)
        for _ in range(loop):
            has_error = False
            for i in range(n_sample):
                if (y[i] * np.dot(alpha * times * y, gram[:, i])) <= 0:
                    has_error = True
                    times[i] += 1
            if not has_error:
                break
        self.theta = np.dot(alpha * times * y, X)
        return self

    def predict(self, X):
        return np.dot(X, self.theta)
```
