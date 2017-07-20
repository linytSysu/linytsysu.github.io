---
layout: post
title: Mac OS X终端配置
summary: 
tags: [mac-terminal]
---

## 1. ls命令显示颜色

在 `~/.bash_profile`中加入：
``` bash
# enables color in the terminal bash shell
export CLICOLOR=1
```
重启终端后，使用的`ls`命令就会带有颜色

Alternative:
在 `~/.bash_profile`中加入：
``` bash
alias ls='ls -vG'
```
重启终端后，使用的`ls`命令就会带有颜色

上面两种方法选择一种即可。

## 2. 自定义ls命令颜色

步骤1中，`ls`显示的颜色是默认。也可以对`ls`显示的颜色进行自定义。 在 `~/.bash_profile`中加入：
``` bash
export LSCOLORS="ExFxCxDxBxegedabagacad"
```

`"ExFxCxDxBxegedabagacad"`是配色格式，顺序是：
```
1.directory
2.symbolic link
3.socket
4.pipe
5.executable
6.block special
7.character special
8.executable with setuid bit set
9.executable with setgid bit set
10.directory writable to others, with sticky bit
11.directory writable to others, without sticky bit
```
颜色的对应值是：
```
a = black
b = red
c = green
d = brown
e = blue
f = magenta
g = cyan
h = light grey
A = bold black, usually shows up as dark grey
B = bold red
C = bold green
D = bold brown, usually shows up as yellow
E = bold blue
F = bold magenta
G = bold cyan
H = bold light grey; looks like bright white
x = default foreground or background
```
而每种文件类型都有两种颜色 —— 前景色和背景色。例如 `LSCOLORS='fxexbxdxcxegedabagacad'` 的开头fx表示目录的前景色是magenta，背景底色是原先Terminal的底色。
可以通过 [https://geoff.greer.fm/lscolors/](https://geoff.greer.fm/lscolors/)，这个网站来产生LSCOLORS字符串。

## 3. 修改Prompt

在 `~/.bash_profile`中加入：
``` bash
PS1='\[\e[0;33m\]\u\[\e[0m\]@\[\e[0;32m\]\h\[\e[0m\]:\[\e[0;34m\]\w\[\e[0m\]\$ '
```
改修改主要包括内容和颜色两个方面。比如`u`表示用户名，`h`表示主机名，`w`表示目录路径。

具体规则可以参考： [Mac - Terminal 使Mac Terminal有顏色(Prompt與ls) - Eason’s Garage](http://koko.ntex.tw/wordpress/mac-terminal-bash-color/)

## 4. 使用theme

想要拥有更好的终端配色方案的话，可以使用网络上流行的专门配色方案：

+ [GitHub - chriskempson/tomorrow-theme: Tomorrow Theme the precursor to Base16 Theme](https://github.com/chriskempson/tomorrow-theme)

+ [GitHub - altercation/solarized: precision color scheme for multiple applications (terminal, vim, etc.) with both dark/light modes](https://github.com/altercation/solarized)

以`Tomorrow Theme`为例，将GitHub仓库拷贝下来后，进入相应目录，能够很多针对不同终端货编辑器的文件夹。进入`OS X Terminal`目录后，双击	`.terminal`文件就能够将主题导入Terminal中了。然后设置该主题为默认主题即可。

该主题也包含了vim的配色方案，参考： [开发工具颜色搭配 —— 折腾 mac 系统 - 腾讯Web前端 IMWeb 团队社区](http://imweb.io/topic/55fe849171a0b7636f0c2f90)，可以进行设置。


## 5. Prompt显示分支名

[https://mfitzp.io/article/add-git-branch-name-to-terminal-prompt-mac/](https://mfitzp.io/article/add-git-branch-name-to-terminal-prompt-mac/)
``` bash
parse_git_branch() {
  git branch 2> /dev/null | sed -e '/^[^*]/d' -e 's/* \(.*\)/(\1)/'
}
PS1="\[\e[0;33m\]\u\[\e[0m\]@\[\e[0;32m\]\h\[\e[0m\]:\[\e[0;34m\]\w\[\e[0m\]\[\033[32m\]\$(parse_git_branch)\[\033[00m\] $ "
```
如果想要进一步显示分支是否dirty，可以参考： [GitHub - jimeh/git-aware-prompt: Display current Git branch name in your terminal prompt when in a Git working directory.](https://github.com/jimeh/git-aware-prompt) 进行设置。


## Links
+ [Mac Terminal 使Mac Terminal有顏色(Prompt與ls) - Eason’s Garage](http://koko.ntex.tw/wordpress/mac-terminal-bash-color/)

+ https://geoff.greer.fm/lscolors/

+ [开发工具颜色搭配 —— 折腾 mac 系统 - 腾讯Web前端 IMWeb 团队社区](http://imweb.io/topic/55fe849171a0b7636f0c2f90)

+ [終端機 iTerm2 及設定 bash_profile](https://zlargon.github.io/blog/MAC/tools/mac-terminal/)

+ [让Mac OS X的终端多姿多彩 - linfan’s blog](http://linfan.info/blog/2012/02/27/colorful-terminal-in-mac/)

+ https://mfitzp.io/article/add-git-branch-name-to-terminal-prompt-mac/

+ [GitHub - chriskempson/tomorrow-theme: Tomorrow Theme the precursor to Base16 Theme](https://github.com/chriskempson/tomorrow-theme)

+ [GitHub - altercation/solarized: precision color scheme for multiple applications (terminal, vim, etc.) with both dark/light modes](https://github.com/altercation/solarized)

+ [GitHub - jimeh/git-aware-prompt: Display current Git branch name in your terminal prompt when in a Git working directory.](https://github.com/jimeh/git-aware-prompt)


