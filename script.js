
const params = new URLSearchParams(window.location.search);
const searchQuery = params.get('q');
const courseID = params.get('id');
const help = document.getElementById('help');


if (searchQuery) {
    help.style.display = 'none'
    // fetch('./cources.json')
    //     .then(response => response.json())
    //     .then(data => {
    //         let searchResults = data.data.items.filter(course => course.name.includes(searchQuery) || course.code.includes(searchQuery));
    //         console.log(searchResults)

    //         var ul = document.getElementById('courseList');

    //         searchResults.forEach((course) => {
    //             var li = document.createElement('li');

    //             var a = document.createElement('a');
    //             a.textContent = course.name;
    //             a.href = `${window.location.origin}/?id=${course.id}`;;
                    
    //             li.appendChild(a)
    //             ul.appendChild(li);
    //         });
    //     });
    fetch('./cources.json')
  .then(response => response.json())
  .then(data => {
    let searchResults = data.data.items.filter(course => course.name.includes(searchQuery) || course.code.includes(searchQuery));

    var resultsEl = document.getElementById('courseList');

    searchResults.forEach(course => {
      var card = document.createElement('div');
      card.classList.add('card');
      card.style.border = '1px solid #ccc';
      var nameEl = document.createElement('h3');  
      nameEl.textContent = course.name;
      card.className = 'card';    
      var codeLink = document.createElement('a');
      codeLink.href = `${window.location.origin}/?id=${course.id}`; 
      codeLink.textContent = course.code;

      card.appendChild(nameEl);
      card.appendChild(codeLink);

      resultsEl.appendChild(card);


      
    });
  });
} else if (courseID) {
    help.style.display = 'block'
    fetch(`https://v.ustc.edu.cn/api/v1/course/${courseID}/schedules`)
        .then(response => response.json())
        .then(data => {
            var ul = document.getElementById('courseList');

            data.data.forEach((schedule) => {
                var li = document.createElement('li');

                var a = document.createElement('a');
                a.textContent = schedule.start_time;
                a.href = `https://v.ustc.edu.cn/api/v1/captures/${schedule.capture_code}/capture-iframe-url?language=zh-CN&is_lesson_resource=false`
                a.target = "_blank";

                // a.addEventListener('click', function (e) {
                //     e.preventDefault();
                //     fetch(`https://v.ustc.edu.cn/api/v1/captures/${schedule.capture_code}/capture-iframe-url?language=zh-CN&is_lesson_resource=false`)
                //         .then(response => response.json())
                //         .then(data => {
                //             if (data.error) {
                //                 alert(data.error.message)
                //             }
                //         })
                // });

                li.appendChild(a)
                ul.appendChild(li);
            });
        });

}