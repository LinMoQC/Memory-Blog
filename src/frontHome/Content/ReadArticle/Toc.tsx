import { useEffect, useState } from 'react';

const TocComponent = () => {
    const [toc, setToc] = useState('');

    useEffect(() => {
        const Toc = () => {
            let toc = '';
            let level = 0;
            const container = document.getElementById('content');
            if (!container) return;

            container.innerHTML.replace(/<h([\d])>(.*?)<\/h([\d])>/g, (str, openLevel, titleText, closeLevel) => {
                if (openLevel !== closeLevel) {
                    return str;
                }
                if (openLevel > level) {
                    toc += (new Array(openLevel - level + 1)).join('<ul>');
                } else if (openLevel < level) {
                    toc += (new Array(level - openLevel + 1)).join('</li></ul>');
                } else {
                    toc += (new Array(level + 1)).join('</li>');
                }
                level = parseInt(openLevel);
                if (titleText.match(/<a(.*?)<\/a>/g)) {
                    let str1 = titleText.match(/<a(.*?)<\/a>/g)[0];
                    let aid = str1.match(/id="(.*?)"/g)[0];
                    aid = aid.replace('id="', '').replace('"', '');
                    titleText = titleText.replace(/<a(.*?)<\/a>/g, '');
                    titleText = `<a href="#${aid}" class="font12 nowrap titleText">${titleText}</a></div>`;
                    toc += '<li><div class="flex mb4"><i class="nb-pull-down"></i>' + titleText;
                }
                return '';
            });
            if (level) {
                toc += (new Array(level + 1)).join('</ul>');
            }
            if (toc.match(/<ul><ul>/g)) {
                toc = toc.replace(/<ul><ul><ul>+/g, '<ul>').replace(/<\/ul><\/ul> <\/ul>+/g, '</ul>');
            }
            setToc(toc);
        };

        Toc(); // 调用 Toc 函数

        const liArr = document.querySelectorAll('li');
        if (liArr) {
            for (let i = 0; i < liArr.length; i++) {
                if (liArr[i].innerHTML.match('<ul>')) {
                } else {
                    liArr[i].innerHTML = liArr[i].innerHTML.replace('<i class="nb-pull-down"></i>', '').replace('font12 nowrap titleText', 'font12 nowrap titleText ml16');
                }
            }
        }
    }, []); // 空依赖项确保只在组件挂载时执行

    return (
        <div id="toc" dangerouslySetInnerHTML={{ __html: toc }}></div>
    );
};

export default TocComponent;
