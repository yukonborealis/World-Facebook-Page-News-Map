/*
New Javascript SDK & OAuth 2.0 based FBConnect
http://thinkdiff.net/facebook/new-javascript-sdk-oauth-2-0-based-fbconnect-tutorial/
*/
var fbapp_id = '',
    login_button,
    user_info,
    ACCESS_TOKEN;

window.fbAsyncInit = function() {
  FB.init({
    appId: "1583671478610641", //change the appId to your appId
    status: true,
    cookie: true,
    xfbml: true,
    oauth: true
  });

  // run once with current status and whenever the status changes
  FB.getLoginStatus(updateOauthButton);
  FB.Event.subscribe('auth.statusChange', updateOauthButton);

  function updateOauthButton(response) {
    // Get the html elements
    login_button = document.getElementById('fb-auth');
    user_info = document.getElementById('user-info');

    if (response.authResponse) {
      //user is already logged in and connected
      FB.api('/me', function(info) {
        changeOauthDOMContent('login', info);
        ACCESS_TOKEN = response.authResponse.accessToken;
      });

      login_button.onclick = function() {
        FB.logout(function(response) {
          changeOauthDOMContent('logout');
        });
      };
    } else {
      //user is not connected to your app or logged out
      login_button.innerHTML = '<i class="icon-user icon-white"></i> ' + 'Log in';
      login_button.onclick = function() {
        FB.login(function(response) {
          if (response.authResponse) {
            FB.api('/me', function(info) {
              changeOauthDOMContent('login', info);
              ACCESS_TOKEN = response.authResponse.accessToken;
            });
          }
        }, {scope:'email,user_birthday,user_about_me,user_friends'});
      }
    }
  }
};
(function() {
  var e = document.createElement('script'); e.async = true;
  e.src = document.location.protocol + '//connect.facebook.net/en_US/all.js';
  document.getElementById('fb-root').appendChild(e);
}());

function changeOauthDOMContent (status, info) {
  if (status == 'login') {
    user_info.innerHTML = '<img src="https://graph.facebook.com/' + info.id + '/picture" height="24" width="24">  ' + info.name;
    login_button.innerHTML = '<i class="icon-user icon-white"></i> ' + 'Log out';
  } else if (status == 'logout') {
    user_info.innerHTML = "";
    document.getElementById('debug').innerHTML = "";
  }
}
