let app = new Vue({
    el: '#app', 

    data: {
        bookList: {
        },

        favList: {
            title: '',
        },

        loading: false,
        message: '',
        img: '',
    }, 

    methods: {
        async searchBook() {
            try {
                this.loading = true;
                const response = await axios.get('https://openlibrary.org/search.json?q=' + this.message);
                console.log("response: ", response);

                this.bookList = response.data;
                
                //for (var i = 0; i < response.data.num_found; ++i){

                    const response2 = await axios.get('https://openlibrary.org/api/books?bibkeys=' + response.data.docs[0].isbn[0]
                + '&jscmd=details&format=json');
                this.img = response2.data[response.data.docs[0].isbn[0]].thumbnail_url;
                //}

                console.log("respone2: ", response2);
                
                this.loading = false;
                
              } 
              
              catch(error) {
                console.log(error);
              }

            this.message = '';
        },
    }
});