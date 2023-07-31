#!/bin/bash

# 获取所有Tag
tags=$(git tag)

# 逆序排列Tag
tags=($tags)
tags=(${tags[@]} )
tags=($(for i in "${tags[@]}"; do echo $i; done | sort -r))

# 逐个检查Tag状态,直到找到第一个成功的
for tag in ${tags[@]}; do
  status=$(git rev-list -n 1 $tag | xargs curl -u "$GITHUB_TOKEN" -i https://api.github.com/repos/$GITHUB_REPOSITORY/commits/$sha/status)
  echo $status
  if [[ $status == *"success"* ]]; then
    echo $tag
    break
  fi
done

# 输出tag作为输出
# echo "::set-output name=tag::$tag"

# 获取上一个成功的 Tag
prev_tag=$tag

# 获取当前分支commit SHA
curr_sha=$(git rev-parse HEAD)

# 获取上一次commit SHA
prev_sha=$(git rev-list -n 1 $prev_tag)

# 获取这段时间内的所有commit
commits=$(git log $prev_sha..$curr_sha --pretty=format:"%h - %s [%an]")

# 输出commit日志
echo -e "$commits"

# 输出给步骤输出
echo "::set-output name=commits::$commits"
