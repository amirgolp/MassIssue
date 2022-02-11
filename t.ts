import { CRAWLER_CONFIG, PAGE_ISSUE } from '../../../../../engine/interfaces'
import FeedItem from '../../../../../engine/util/FeedItem'

const config: CRAWLER_CONFIG = {
    start_url: 'https://ijdsj.online/current-issue/',

    toc_parser: (pageIssue) => {
        const type = 'ARTICLE';
        const result:FeedItem[] = [];

        const monthEnum = {
            january: '01',
            february: '02',
            march: '03',
            april: '04',
            may: '05',
            june: '06',
            july: '07',
            august: '08',
            september: '09',
            october: '10',
            november: '11',
            december: '12'
          }

        const issueContainer = Array.from(document.querySelectorAll('h2'))[1]; 
        
        // this only parses the current issue which there is only one issue at the moment. 
        // They mentioned for the new issue, the template will change. Probably needs to be changed when new issue is published.

        const issueRegex = /Issue\s(?<issue>\d{1,2})\s\((?<month>.*)\s(?<year>\d+)/;

        const year = parseInt(issueRegex.exec(issueContainer.innerText).groups.year);
        const issue = issueRegex.exec(issueContainer.innerText).groups.issue;
        const month =  monthEnum[issueRegex.exec(issueContainer.innerText).groups.month.toLowerCase().trim()];
        
        const articleContainer = Array.from(document.querySelectorAll('div.wp-block-column'))[2]
        const articles = articleContainer.querySelectorAll('p.has-medium-font-size');

        const articleRegex = /.*\(pp.*/i // to match if there is any page number inside the p-Tag
        const pageRegex = /.*\(pp\.\s(?<pages>\d*-\d*)\).*/i // extracting: International Journal of Disability and Social Justice: Introduction and Aspiration (pp. 5-26) | Angharad E. Beckett and Anna Lawson

        for (const article of articles ) {
            
            const allAnchors = Array.from(article.querySelectorAll('a'));

            const title = allAnchors[0].innerText !== '\n' ? allAnchors[0].innerText : allAnchors[1].innerText;

            const url = allAnchors[0].href;
            let pages = '';
            let authors = '';
            if (articleRegex.test(article.textContent)) {
                for (let aTag of allAnchors) {
                    if (aTag.textContent !== '' && aTag.textContent.split(' ').length < 4 ) {
                        authors += (aTag.innerText) + ', ';
                    }
                }
                pages = pageRegex.exec(article.textContent).groups.pages;
            }
            result.push({
                link: url,
                type: type,
                author: authors.trim(),
                publicationYear: year,
                publicationMonth: month,
                issue: issue,
                title : title,
                pages: pages
            })
          }

        return result;
    }
};

export default config;