/* dark mode stuff */
const toggleSwitch = document.querySelector('#checkbox');

if(localStorage.darkmode == 'true'){
  toggleSwitch.checked = 'true';
  document.body.className = 'dark';
};

toggleSwitch.addEventListener('click', function(e){
  const {checked} = toggleSwitch;
  document.body.className = checked ? 'dark' : '';
  localStorage.darkmode = checked;
});