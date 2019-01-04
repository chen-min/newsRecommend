import './NewsPanel.css'
import React from 'react'
import NewsCard from '../NewsCard/NewsCard'
import _ from 'lodash';
import Auth from '../Auth/Auth';



class NewsPanel extends React.Component{
    constructor(){
        super();
        this.state = {news:null, pageNum:1, loadedAll:false};
        this.handleScroll = this.handleScroll.bind(this);
    }

    componentDidMount(){
        this.loadMoreNews();
        this.loadMoreNews =  _.debounce(this.loadMoreNews,1000)
        window.addEventListener('scroll', this.handleScroll)
    }

    handleScroll() {
        const scrollY = window.scrollY
            || window.pageYOffset
            || document.documentElement.scrollYTop;
        if((window.innerHeight + scrollY) >= (document.body.offsetHeight - 50)) {
            console.log('Loading more news!');
            this.loadMoreNews();
        }
    }

    loadMoreNews(e){
        if(this.state.loadedAll === true){
            return 
        }
        let url = 'http://localhost:3000/news/userId/' + Auth.getEmail() + '/pageNum/' + this.state.pageNum;

        // let url = 'http://localhost:3001/news/userId/' + Auth.getEmail() + '/pageNum/' + this.state.pageNum;
        console.log(url, 'url发送请求')
        let request = new Request(encodeURI(url), {
            method: 'GET',
            headers: {
                'Authorization': 'bearer ' + Auth.getToken(),
            },
            cache: false
        });
        fetch(request)
            .then((res) => res.json())
            .then((news) => {
                if(!news || news.length === 0){
                    this.setState({loadedAll: true});
                }
                this.setState({ news: this.state.news ? this.state.news.concat(news) : news,
                pageNum: this.state.pageNum + 1})
            })
    }

    renderNews(){
        var news_list = this.state.news.map(function(news) {
            return (
                <a className='list-group-item' key={news.digest} href='#'>
                    <NewsCard news = {news} />
                </a>
            );
        });
        
        return (
            <div className="container-fluid">
                <div className='list-group'>
                    {news_list}
                </div>
            </div>
        );
    }
    render(){
        if(this.state.news) {
            return (
                <div>
                    {this.renderNews()}
                </div>
            );
        } else {
            return (
                <div>loading...</div>
            )
        }

    }
}

export default NewsPanel