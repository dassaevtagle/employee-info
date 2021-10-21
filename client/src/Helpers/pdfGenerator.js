import HttpService from "../Services/HttpService"
import jsPDF from 'jspdf'

const generatePdf = async (username) => {
  try {
    const userInfoResp = await HttpService().getPersonInfo(username)
    appendCvTemplate(userInfoResp.data)
    let doc = new jsPDF('p', 'pt', 'a3')
    let cvContainer = document.querySelector(`#cv-container-${userInfoResp.data.person.subjectId}`)
    cvContainer.style.display = "block"
    let cvTemplate = document.querySelector(`#cv-template-${userInfoResp.data.person.subjectId}`)
    doc.html(cvTemplate, {
      callback: function(pdf){
        pdf.save(`${userInfoResp.data.person.publicId}.pdf`)
        document.querySelector('#root').removeChild(cvContainer)
      }
    })
  } catch(e) {
    alert(e)
  }
}

const appendCvTemplate = (userInfo) => {
  let cv = document.createElement("div")
  cv.id = `cv-container-${userInfo.person.subjectId}`
  cv.style.display = "none"
  let content = `
  <div class="wrapper" id="cv-template-${userInfo.person.subjectId}">
        <div class="sidebar-wrapper">
            <div class="profile-container">
                <img class="profile" src="assets/images/profile.png" alt="" />
                <h1 class="name">${userInfo.person.name}</h1>
                <h3 class="tagline">${userInfo.person.professionalHeadline}</h3>
            </div><!--//profile-container-->
            
            <div class="contact-container container-block">
                <ul class="list-unstyled contact-list">
                    <li>${userInfo.person.location.shortName}</li>
                    <li class="email"><i class="fas fa-envelope"></i>alan.doe@website.com</li>
                    <li class="phone"><i class="fas fa-phone"></i>0123 456 789</li>
                    <li class="website"><i class="fas fa-globe"></i>portfoliosite.com</li>
                    <li class="linkedin"><i class="fab fa-linkedin-in"></i></li>
                    <li class="github"><i class="fab fa-github"></i>github.com/username</li>
                    <li class="twitter"><i class="fab fa-twitter"></i>@twittername</li>
                </ul>
            </div><!--//contact-container-->
            <div class="education-container container-block">
                <h2 class="container-block-title">Education</h2>
                <div class="item">
                    <h4 class="degree">MSc in Computer Science</h4>
                    <h5 class="meta">University of London</h5>
	                    <div class="time">2016 - 2018</div>
                </div><!--//item-->
                <div class="item">
                    <h4 class="degree">BSc in Applied Mathematics</h4>
                    <h5 class="meta">Bristol University</h5>
                    <div class="time">2012 - 2016</div>
                </div><!--//item-->
            </div><!--//education-container-->
            
            <div class="languages-container container-block">
                <h2 class="container-block-title">Languages</h2>
                <ul class="list-unstyled interests-list">
                    <li>English <span class="lang-desc">(Native)</span></li>
                    <li>French <span class="lang-desc">(Professional)</span></li>
                    <li>Spanish <span class="lang-desc">(Professional)</span></li>
                </ul>
            </div><!--//interests-->
            
            <div class="interests-container container-block">
                <h2 class="container-block-title">Interests</h2>
                <ul class="list-unstyled interests-list">
                    <li>Climbing</li>
                    <li>Snowboarding</li>
                    <li>Cooking</li>
                </ul>
            </div><!--//interests-->
            
        </div><!--//sidebar-wrapper-->
        
        <div class="main-wrapper">
            
            <section class="section summary-section">
                <h2 class="section-title"><span class="icon-holder"><i class="fas fa-user"></i></span>Career Profile</h2>
                <div class="summary">
                    <p>${userInfo.person.summaryOfBio}</p>
                </div><!--//summary-->
            </section><!--//section-->
            
            <section class="section experiences-section">
                <h2 class="section-title"><span class="icon-holder"><i class="fas fa-briefcase"></i></span>Experiences</h2>
                
                <div class="item">
                    <div class="meta">
                        <div class="upper-row">
                            <h3 class="job-title">Lead Developer</h3>
                            <div class="time">2019 - Present</div>
                        </div><!--//upper-row-->
                        <div class="company">Startup Hubs, San Francisco</div>
                    </div><!--//meta-->
                    <div class="details">
                        <p>Describe your role here lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo.</p>  
                        <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. </p>
                    </div><!--//details-->
                </div><!--//item-->
                
                <div class="item">
                    <div class="meta">
                        <div class="upper-row">
                            <h3 class="job-title">Senior Software Engineer</h3>
                            <div class="time">2018 - 2019</div>
                        </div><!--//upper-row-->
                        <div class="company">Google, London</div>
                    </div><!--//meta-->
                    <div class="details">
                        <p>Describe your role here lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem.</p>  
                        
                    </div><!--//details-->
                </div><!--//item-->
                
                <div class="item">
                    <div class="meta">
                        <div class="upper-row">
                            <h3 class="job-title">UI Developer</h3>
                            <div class="time">2016 - 2018</div>
                        </div><!--//upper-row-->
                        <div class="company">Amazon, London</div>
                    </div><!--//meta-->
                    <div class="details">
                        <p>Describe your role here lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem.</p>  
                    </div><!--//details-->
                </div><!--//item-->
                
            </section><!--//section-->
            
            <section class="section projects-section">
                <h2 class="section-title"><span class="icon-holder"><i class="fas fa-archive"></i></span>Projects</h2>
                <div class="intro">
                    <p>You can list your side projects or open source libraries in this section. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum et ligula in nunc bibendum fringilla a eu lectus.</p>
                </div><!--//intro-->
                <div class="item">
                    <span class="project-title"><a href="https://themes.3rdwavemedia.com/bootstrap-templates/startup/coderpro-bootstrap-5-startup-template-for-software-projects/" target="_blank">CoderPro</a></span> - <span class="project-tagline">A responsive website template designed to help developers launch their software projects. </span>
                    
                </div><!--//item-->
                <div class="item">
                    <span class="project-title"><a href="https://themes.3rdwavemedia.com/bootstrap-templates/startup/launch-bootstrap-5-template-for-saas-businesses/" target="_blank">Launch</a></span> - <span class="project-tagline">A responsive website template designed to help startups promote their products or services.</span>
                </div><!--//item-->
                <div class="item">
                    <span class="project-title"><a href="https://themes.3rdwavemedia.com/bootstrap-templates/resume/devcard-bootstrap-5-vcard-portfolio-template-for-software-developers/" target="_blank">DevCard</a></span> - <span class="project-tagline">A portfolio website template designed for software developers.</span>
                </div><!--//item-->
                <div class="item">
                    <span class="project-title"><a href="https://themes.3rdwavemedia.com/bootstrap-templates/startup/bootstrap-template-for-mobile-apps-nova-pro/" target="_blank">Nova Pro</a></span> - <span class="project-tagline">A responsive Bootstrap theme designed to help app developers promote their mobile apps</span>
                </div><!--//item-->
                <div class="item">
                    <span class="project-title"><a href="http://themes.3rdwavemedia.com/website-templates/responsive-bootstrap-theme-web-development-agencies-devstudio/" target="_blank">DevStudio</a></span> - 
                    <span class="project-tagline">A responsive website template designed to help web developers/designers market their services. </span>
                </div><!--//item-->
            </section><!--//section-->
        </div><!--//main-body-->
    </div>`
  cv.innerHTML = content
  document.querySelector('#root').appendChild(cv)
}

export default generatePdf