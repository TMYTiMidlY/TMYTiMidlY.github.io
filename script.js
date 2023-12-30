
const params = new URLSearchParams(window.location.search);
const searchQuery = params.get('q');
const courseID = params.get('id');
const resultsEl = document.getElementById('courseList');
const help = document.getElementById('help');

if (searchQuery) {
    help.style.display = 'none'
    fetch('./cources.json')
        .then(response => response.json())
        .then(data => {
            let searchResults = data.data.items.filter(course => course.name.includes(searchQuery) || course.code.includes(searchQuery));
            console.log(searchResults)


            searchResults.forEach(course => {
                var card = document.createElement('div');
                card.classList.add('card');
                card.style.border = '1px solid #ccc';
                var nameEl = document.createElement('h3');
                nameEl.textContent = course.name;
                card.className = 'card';
                var codeLink = document.createElement('a');
                codeLink.href = `${window.location.origin}/TMYTiMidlY.github.io/?id=${course.id}`;
                codeLink.textContent = course.code;

                card.appendChild(nameEl);
                card.appendChild(codeLink);

                resultsEl.appendChild(card);
            });
        });

} else if (courseID) {
    help.style.display = 'block'

    var loading = document.createElement('h3');
    loading.textContent = '加载中...';
    resultsEl.appendChild(loading);

    fetch(`https://v.ustc.edu.cn/api/v1/course/${courseID}/schedules`)
        .then(response => response.json())
        .then(data => {
            resultsEl.removeChild(loading)

            console.log(data)
            data.data.forEach(schedule => {
                var card = document.createElement('div');
                card.classList.add('card');
                card.style.border = '1px solid #ccc';
                var nameEl = document.createElement('h3');

                var start_date = new Date(schedule.start_time);
                var end_date = new Date(schedule.end_time);
                nameEl.textContent = `${start_date.toLocaleDateString()} ${start_date.toLocaleTimeString()} - ${end_date.toLocaleTimeString()} `;

                card.className = 'card';
                var codeLink = document.createElement('a');
                codeLink.href = `https://v.ustc.edu.cn/api/v1/captures/${schedule.capture_code}/capture-iframe-url?language=zh-CN&is_lesson_resource=false`;
                codeLink.target = "_blank";
                codeLink.textContent = `week ${schedule.week}, ${schedule.status}`;

                card.appendChild(nameEl);
                card.appendChild(codeLink);

                resultsEl.appendChild(card);
            });
        });
}