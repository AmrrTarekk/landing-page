/**
 *
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to sections from navigation,
 * and highlights section in viewport upon scrolling.
*/

//-------------------------------------------------------------
// Global Variables

const sectionsList = document.querySelectorAll('section');
const navigationBar = document.getElementById('navbar__list');

// making a virtual dom to reduce reflow
const frag = document.createDocumentFragment();

// create an object for the scrollIntoView funtion
const obj = {behavior:'smooth'};

//-------------------------------------------------------------

// Function 1 : creating a list of links and append it to the navigation bar menu

function createNavList()
{
    // Loop over all sections
  for(let i=0;i<sectionsList.length;i++)
  {
    let  dataNav = sectionsList[i].getAttribute('data-nav');

    // create new lists
    let newList = document.createElement('li');
    newList.textContent = dataNav;

    // set classes to the new created list
    newList.classList.add('navbar__menu','menu__link');
    frag.appendChild(newList);

    // add event which scroll into the selected section from navigation menu
    newList.addEventListener('click',function clickMeToScroll(){
      sectionsList[i].scrollIntoView(obj);
    });

    // append the navigation menu to virtual dom which reduces reflow
    navigationBar.appendChild(frag);
  }
} // Function ends here

// calling the function which creates the new unlisted navigation menu
createNavList();

//--------------------------------------------------------------

// Function 2 : add event which shows the active status for the selected section
//              using a fucntion checks for the section which is selected.

document.addEventListener('scroll',function viewSection (){
  // Loop over all sections
  sectionsList.forEach(function (sec)
  {
    // get coordinates of the section viewed by the user
    let coordinates = sec.getBoundingClientRect();

    // check on top view coordinates
    if(coordinates.top >= 0 && coordinates.top <= 200)
    {
      // calling the function which checks and sets the active status
      setActiveSection(sec);
    }
    else
    {
      // if section is not selected then remove active class
      sec.classList.remove('your-active-class');
    }

  });
});

// -----------------------------------------------------------------

// Function 3 : the function used to check and set the active statuse for selected section

function setActiveSection(sec)
{
  // check if the active class exist
  if(sec.getAttribute('class')!=="your-active-class")
  {
    // if not exist then add it to the selected section
    sec.classList.toggle('your-active-class');

    // active the link(list) which refers to the section selected (viewed)
    let lists = document.querySelectorAll('li');
    activeData = sec.getAttribute('data-nav');
    for(let list of lists)
    {
      if(list.textContent === activeData)
      {
        // if the link selected then highlight it
          list.style.backgroundColor='#4d4d4d';
      }
      else
      {
        // if not selected, then remove the highlight color
          list.style = 'default';
      }
    }
  }
}

// ---------------------------------------------------------
