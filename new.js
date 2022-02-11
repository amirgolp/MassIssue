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
        const pageRegex = /.*\(pp\.\s(?<pages>\d*-\d*)\).*/i // extracting: International Journal of Disability and Social Justice: Introduction and Aspiration (pp. 5-26) | Angharad E. Beckett and Anna Lawson

        for (const article of articles ) {
            
            const allAnchors = Array.from(article.querySelectorAll('a'));
            const url = allAnchors[0].href;
            const title = allAnchors[0].innerText;
            if (articleRegex.test(article.innerText)) {
                
                let authors = ''
                for (let ii = 1; ii < allAnchors.length; ii++) {
                    authors += (allAnchors[ii].innerText) + ', ';
                }
                const pages = pageRegex.exec(article.innerText).groups.pages;
            }
            result.push({
                link: url,
                type,
                publicationYear: year,
                publicationMonth: month,
                issue: issue,
                title :title
            })
          }

        // for(const yearElement of yearElements){
        //     const issueElements : HTMLAnchorElement[] = Array.from(yearElement.querySelectorAll('a'))
        //     for(const issueElement of issueElements){
        //         const url = "https://www.manz.at/produkte/zeitschriften/taxlex/archiv#" + issueElement.textContent;
        //         const year = parseInt(yearRegex.exec(issueElement.textContent).groups.year)
        //         const ausgabe = yearRegex.exec(issueElement.textContent).groups.issue
        //     }
        // }
        return result;
    }
};

export default config;
