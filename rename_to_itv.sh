#!/bin/bash

# 定义要查找和替换的字符串
SEARCH_TERM="moontv"
REPLACE_TERM="ITV"
SEARCH_TERM_LOWER="moontv"
REPLACE_TERM_LOWER="itv"

# 定义要修改的文件列表
FILES=(
  "wrangler.toml"
  "package.json"
  "public/manifest.json"
  "README.md"
  "src/app/layout.tsx"
  "src/components/Sidebar.tsx"
  "src/components/MobileHeader.tsx"
  "src/app/login/page.tsx"
  "src/lib/db.client.ts"
)

# 循环遍历并替换文件内容
for FILE in "${FILES[@]}"
do
  if [ -f "$FILE" ]; then
    # 使用 sed 命令进行替换
    # 注意：macOS 和 Linux 的 sed 命令语法略有不同
    if [[ "$OSTYPE" == "darwin"* ]]; then
      # macOS
      sed -i '' "s/${SEARCH_TERM}/${REPLACE_TERM}/g" "$FILE"
      sed -i '' "s/${SEARCH_TERM_LOWER}/${REPLACE_TERM_LOWER}/g" "$FILE"
    else
      # Linux
      sed -i "s/${SEARCH_TERM}/${REPLACE_TERM}/g" "$FILE"
      sed -i "s/${SEARCH_TERM_LOWER}/${REPLACE_TERM_LOWER}/g" "$FILE"
    fi
    echo "已更新文件: $FILE"
  else
    echo "警告: 文件未找到: $FILE"
  fi
done

echo "所有替换已完成！"
