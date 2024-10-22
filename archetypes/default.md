---
title: {{ replace .Name "-" " " | title }}
description: 
slug: {{ .Name }}
date: {{ .Date | time.Format "2006-01-02 15:04:05" }}
categories:
    - others
tags: []
---