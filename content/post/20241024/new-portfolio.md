---
title: Hugo + GitHub Pagesでブログを開設した
description: 
slug: new-portfolio
date: 2024-10-24 09:27:04
categories:
    - blog
    - works
tags: ["works", "hugo", "github pages"]
---

## はじめに

ドメインを取得してから長らくリンク集としての活用しかできていなかったのですが、このたびちゃんとブログ兼ポートフォリオとして活用しようと思い立ちました。

構成としては、Hugoで静的サイトを生成して、GitHub Pagesでホスティング、デプロイはGitHub Actionsを使っているという感じです。

まぁ個人の備忘録で少しは誰かの役に立てばという感じ...

[GitHubリポジトリ](https://github.com/iharuki79/myportfolio)

## Hugoについて

Go言語で書かれた静的サイトジェネレータで、オープンソースで開発されておりテーマがいっぱいあります。GitHub Pagesが静的サイトホスティングなので([GitHub Pagesについて](https://docs.github.com/ja/pages/getting-started-with-github-pages/about-github-pages))、自分でサイトを作っていじりたいがサーバー選びが面倒臭い、という場合にぴったりです。また、記述がMarkdown言語なのでHTMLよりも書きやすい(人による)です。

[Hugo公式サイト](https://gohugo.io/)

## テーマについて

[Stack](https://themes.gohugo.io/themes/hugo-theme-stack/)というテーマを選びました。デザインがお気に入りだったから......と言いたいところですが、本音は楽をしたかったからです。

StackテーマではGitHub上にPublic Templateという形式でスターターキット的なの用意されており、従ってポチポチしてるだけでリポジトリ作成→サイトデプロイ→GitHub Actions環境整備までやってくれます。あとはこの内容をガチャガチャいじるだけです。ありがたいですね。

Public Templateは[こちら](https://github.com/CaiJimmy/hugo-theme-stack-starter)。ちなみにDev Containersが使われているのでVSCode拡張でDev Containersを入れる必要があります。

## ビルド＆デバッグ

```sh
## ローカルで立ち上げ
$ hugo server # localhost:1313で確認できる

## ビルド
$ hugo

## 新投稿作成(投稿の命名ルールは人次第)
$ hugo new post/{日付}/{ブログ名}.md
```

## カスタマイズ

色んなカスタマイズについてです。

### config.toml

基本的な設定を書き込み。

```toml:config.toml
baseurl = "https://www.hals.one/"   # ホスティングするURL
languageCode = "ja-jp"  # 日本語なのでja-jpを指定。
title = "hals's page"   # ページタイトル
defaultContentLanguage = "ja"   # デフォルトは日本語(まだ多言語対応してないのでそんなに意味ない)
hasCJKLanguage = true   # 日本語、中国語などはtrueにしないといけないらしい
```

### フォント

中華フォントなのが気になるので`assets/scss/custom.scss`でフォントを読み込んで全部のスタイルを上書き。あと絵文字も。

```scss
@import url('<https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;700&display=swap>');
@import url('<https://fonts.googleapis.com/css2?family=Kiwi+Maru:wght@400;700&display=swap>');

* {
    font-family: 'Noto Sans JP', sans-serif !important;
}
.emoji {
    font-family: Apple Color Emoji, Segoe UI Emoji, NotoColorEmoji, Segoe UI Symbol, Android Emoji, EmojiSymbols;
}
```

### menu.toml

{{< figure src="/images/20241024/menu.png" caption="※画像の貼り方は`static/images/`以下にぶち込んでshortcodeで呼び出すしかない？" >}}

ここのアカウントとして出すリンクとアイコンを決めているっぽいので、ブランドアイコンを持ってきて`assets/icons/`以下に格納し、次のように書く。

```toml
[[social]]
    identifier = "github"
    name = "GitHub"
    url = "https://github.com/iharuki79"

    [social.params]
        icon = "brand-github"
```

### params.toml

日付フォーマットはYYYY/MM/DD hh:mm:ssがいい。

```toml
[dateFormat]
    published = "2006/01/02"
    lastUpdated = "2006/01/02 15:04:05"
```

Twitter(X)で共有したときのOGP設定。

```toml
[opengraph.twitter]
    site = ""
    card = "summary"

[defaultImage.opengraph]
    enabled = true
    local = false
    src = "avatar.jpg"
```

### カテゴリ

`content/categories/{カテゴリ名}/_index.md`を作ると、新しく自分のカテゴリを作ることができる。

私はブログ、制作物、読書記録、競プロ系、参加録、その他で分けてブログを作った。タグとカテゴリの使い分けはあまり出来ていない（カテゴリもタグも複数つけられてしまう）。

```yml
---
title: 読書記録
description: 読んだ本
image:

# Badge style
style:
    background: "#692a9d"
    color: "#fff"
---
```
