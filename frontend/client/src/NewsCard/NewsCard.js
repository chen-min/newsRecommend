import './NewsPanel.css'
import React from 'react'
import NewsCard from '../NewsCard/NewsCard'

class NewsPanel extends React.Component{
    constructor(){
        super();
        this.state = {news:null};
    }

    componentDidMount(){
        this.loadMoreNews();
    }
    loadMoreNews(e){
        this.setState({
            news:[
                {'url': 'https://us.cnn.com/2018/12/21/investing/china-stocks-versus-wall-street/index.html',
                'title': "Think Wall Street's had a bad year? China's was even worse",
                'description': "The recent turbulence in US stock markets pales in comparison with China's dismal 2018.",
                'source': 'cnn',
                'urlToImage': "//cdn.cnn.com/cnnnext/dam/assets/181219182135-zuckerberg-hill-exlarge-169.jpg",
                'digest': '',
                'reason': 'Recommend'
                },
                {'url': 'https://us.cnn.com/2018/12/21/investing/china-stocks-versus-wall-street/index.html',
                'title': "Think Wall Street's had a bad year? China's was even worse",
                'description': "The recent turbulence in US stock markets pales in comparison with China's dismal 2018.",
                'source': 'cnn',
                'urlToImage': "//cdn.cnn.com/cnnnext/dam/assets/181219182135-zuckerberg-hill-exlarge-169.jpg",
                'digest': '',
                'reason': 'Recommend'
                },
                {'url': 'https://us.cnn.com/2018/12/21/investing/china-stocks-versus-wall-street/index.html',
                'title': "Think Wall Street's had a bad year? China's was even worse",
                'description': "The recent turbulence in US stock markets pales in comparison with China's dismal 2018.",
                'source': 'cnn',
                'urlToImage': "//cdn.cnn.com/cnnnext/dam/assets/181219182135-zuckerberg-hill-exlarge-169.jpg",
                'digest': '',
                'reason': 'Recommend'
                },


            ]
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