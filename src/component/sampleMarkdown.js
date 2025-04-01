// components/MarkdownPreviewer/sampleMarkdown.js

export const sampleMarkdown = `# GitHub Flavored Markdown

## Basic Syntax

### Headers

# H1
## H2
### H3
#### H4
##### H5
###### H6

### Emphasis

*This text will be italic*
_This will also be italic_

**This text will be bold**
__This will also be bold__

_You **can** combine them_

### Lists

#### Unordered

* Item 1
* Item 2
  * Item 2a
  * Item 2b

#### Ordered

1. Item 1
2. Item 2
3. Item 3
   1. Item 3a
   2. Item 3b

### Images

![GitHub Logo](https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png)

### Links

[GitHub](http://github.com)

### Blockquotes

> Markdown is a lightweight markup language with plain-text-formatting syntax.

### Inline code

I think you should use an \`<addr>\` element here instead.

### Code blocks

\`\`\`javascript
function fancyAlert(arg) {
  if(arg) {
    $.facebox({div:'#foo'})
  }
}
\`\`\`

### Task Lists

- [x] This is a complete item
- [ ] This is an incomplete item

### Tables

| First Header  | Second Header |
| ------------- | ------------- |
| Content Cell  | Content Cell  |
| Content Cell  | Content Cell  |

### Strikethrough

~~Strikethrough~~
`;