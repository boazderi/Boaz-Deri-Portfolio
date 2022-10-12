'use strict'
console.log('Starting up');

function renderPortfolioRows() {
    var projects = getProjects()
    console.log('projects', projects);
    var elPortfolio = document.querySelector('.row-cards')
    console.log('elPortfolio', elPortfolio);
    var modalStr = ''

    var portfolioStr = projects.map(function (project, idx) {
        var currPortfolioStr = `
        <div class="col-md-4 col-sm-6 portfolio-item">
        <a class="portfolio-link" data-toggle="modal" href="#portfolioModal${idx + 1}">
        <div class="portfolio-hover">
        <div class="portfolio-hover-content">
        <i class="fa fa-plus fa-3x"></i>
        </div>
        </div>
        <img class="img-fluid" src="img/portfolio/0${idx + 1}-full.jpeg" alt="">
        </a>
        <div class="portfolio-caption">
        <h4>${project.name}</h4>
        <p class="text-muted">${project.title}</p>
        </div>
        </div>
        `
        modalStr = `
        <div class="modal-dialog">
        <div class="modal-content">
        <div class="close-modal" data-dismiss="modal">
        <div class="lr">
        <div class="rl"></div>
        </div>
        </div>
        <div class="container">
        <div class="row">
        <div class="col-lg-8 mx-auto">
        <div class="modal-body">
        <!-- Project Details Go Here -->
        <h2>${project.name}</h2>
        <p class="item-intro text-muted">${project.title}</p>
        <img class="img-fluid d-block mx-auto" src="img/portfolio/0${idx + 1}-full.jpeg" alt="">
        <p>${project.desc}
        </p>
        <ul class="list-inline">
        <li>Date: January 2017</li>
        <li>Client: ${project.desc}</li>
        <li>Category: Illustration</li>
        </ul>
        <a href="${project.url}">
        <button class="btn bg-primary" type="button">
        open project</button>
        </a>
        <button class="btn btn-primary" data-dismiss="modal" type="button">
        <i class="fa fa-times"></i>
        Close Project</button>
        </div>
        </div>
        </div>
        </div>
        </div>
        </div>`
        document.querySelector(`#portfolioModal${idx + 1}`).innerHTML = modalStr
        // console.log('portfolioStr',portfolioStr);
        return currPortfolioStr
    })
    elPortfolio.innerHTML = portfolioStr.join('')
}

function ongoToMsgUrl() {
    var urlToGo = 'https://mail.google.com/mail/?view=cm&fs=1&to=me@example.com&su=SUBJECT&b ody=BODY'
    window.open(urlToGo, 'send message')
}