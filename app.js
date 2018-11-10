const vm = new Vue({
    el: '#app',
    data: {
        options: {
            "q": "",
            "key" : "Enter your key here", //Youtube api key
            "maxResults": 25,
            "part": "snippet",
            "type" : "video"
        },
        results: []
    },
    methods: {
        getdata(){
            this.results = [];
            axios.get("https://www.googleapis.com/youtube/v3/search", {params: this.options})
            .then(response => {
                response.data.items.forEach(element => {
                    var date = new Date(element.snippet.publishedAt);
                    var vid = {
                        title : element.snippet.title,
                        time  : date,
                        formattedTime: date.toDateString(),
                        url   : `https://www.youtube.com/watch?v=${element.id.videoId}`,
                        thumb : element.snippet.thumbnails.default.url
                    };
                    this.results.push(vid);
                });
            })
        },
        sortByTitle(){
            this.results = _.sortBy(this.results, "title"); 
        },
        sortByTime(){
            this.results = _.sortBy(this.results, "time");
        }
    }
});