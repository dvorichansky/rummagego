const fixedParseContentLinks = (content) => {
    const div = document.createElement('div');
    div.innerHTML = content;

    const newContent = div;

    const elementsLinksNode = newContent.querySelectorAll('.postLink');

    elementsLinksNode.forEach((link) => {
        link.target = '_blank';
    });
    return newContent.outerHTML;
};

const fixedParseContentWrappers = (content) => {
    const div = document.createElement('div');
    div.innerHTML = content;

    const newContent = div;
    const elementsWrapperNode = newContent.querySelectorAll('.sp-wrap');

    elementsWrapperNode.forEach((element) => {
        const id = Math.floor(Math.random() * (+1000 - +1)) + +1;

        const elementCheckbox = document.createElement('input');
        elementCheckbox.className = 'sp-wrap-checkbox btn';
        elementCheckbox.id = id;
        elementCheckbox.type = 'checkbox';

        const elementHeadNode = element.querySelector('.sp-head');
        const elementLabel = document.createElement('label');
        elementLabel.htmlFor = id;
        elementLabel.className = 'sp-head folded';
        elementLabel.innerHTML = elementHeadNode.textContent;

        elementHeadNode.remove();

        element.insertAdjacentHTML('afterbegin', elementLabel.outerHTML);
        element.insertAdjacentHTML('afterbegin', elementCheckbox.outerHTML);
    });
    return newContent.outerHTML;
};

const fixedParseContentImg = (content) => {
    const div = document.createElement('div');
    div.innerHTML = content;

    const newContent = div;
    const elementsVarNode = newContent.querySelectorAll('var');

    elementsVarNode.forEach((element) => {
        const elementVar = newContent.querySelector(`[title="${element.title}"]`);
        const elementImg = document.createElement('img');
        elementImg.src = element.title;
        elementImg.className = elementVar.className;
        elementVar.parentNode.replaceChild(elementImg, elementVar);
    });
    return newContent.outerHTML;
};

const fixedParseContent = (content) => {
    const newTopicContentImages = fixedParseContentImg(content);
    const newTopicContentImagesAndWrappers = fixedParseContentWrappers(newTopicContentImages);
    const newTopicContentImagesAndWrappersAndLink = fixedParseContentLinks(newTopicContentImagesAndWrappers);

    return newTopicContentImagesAndWrappersAndLink;
};

export {fixedParseContent, fixedParseContentImg, fixedParseContentLinks, fixedParseContentWrappers};