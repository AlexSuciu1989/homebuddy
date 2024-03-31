import React, { useEffect } from 'react';

export const getCookie = (cookieName: string): string | null => {
  const name = cookieName + '=';
  const decodedCookie = decodeURIComponent(document.cookie);
  const cookieArray = decodedCookie.split(';');

  let foundCookieValue: string | null = null;

  cookieArray.forEach((cookie) => {
    const trimmedCookie = cookie.trim();
    if (trimmedCookie.indexOf(name) === 0) {
      foundCookieValue = trimmedCookie.substring(name.length);
    }
  });

  return foundCookieValue;
};


const LogoutComponent: React.FC = () => {
  useEffect(() => {
    const logout = () => {
      const logoutButton = document.querySelector('.logout') as HTMLElement;

      logoutButton.addEventListener('click', () => {
        document.cookie = 'username=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
        document.cookie = 'member=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
        document.cookie = 'memberColors=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
        window.location.href = 'https://homebuddy.ro/';
      });
    };

    const getCookie = (cookieName: string): string | null => {
      const name = cookieName + '=';
      const decodedCookie = decodeURIComponent(document.cookie);
      const cookieArray = decodedCookie.split(';');

      let foundCookieValue: string | null = null;

      cookieArray.forEach((cookie) => {
        const trimmedCookie = cookie.trim();
        if (trimmedCookie.indexOf(name) === 0) {
          foundCookieValue = trimmedCookie.substring(name.length);
        }
      });

      return foundCookieValue;
    };
    

    const getUserColorsArray = (): { [key: string]: string } => {
      const memberColorString = getCookie('memberColors');
      const decodedMemberColorString = decodeURIComponent(memberColorString || '').replace(/%2C%20/g, '_COMMA_');
      const rgbValues = decodedMemberColorString.match(/\d+,\s*\d+,\s*\d+/g);
      const memberColorArray = rgbValues ? rgbValues.map((value) => 'rgb(' + value + ')') : [];
      const memberNamesArray = decodeURIComponent(getCookie('memberNames') || '').split(',');
      const memberInfo: { [key: string]: string } = {};

      memberNamesArray.forEach((name, index) => {
        if (memberColorArray[index]) {
          memberInfo[name] = memberColorArray[index];
        }
      });

      return memberInfo;
    };

    const getUserGreeting = () => {
      const userName = getCookie('username');
      const memberName = getCookie('member');
      const memberInfo = getUserColorsArray();
      const headerUser = document.querySelector('.header-user') as HTMLElement;
      const headerMember = document.querySelector('.header-member') as HTMLElement;
      const logoutButton = document.querySelector('.logout') as HTMLElement;
      const root = document.querySelector(':root') as HTMLElement;

      if (headerUser && headerMember && logoutButton && root) {
        headerUser.textContent = userName || '';
        headerMember.textContent = memberName || '';
        logoutButton.style.backgroundColor = memberInfo[memberName || ''] || '';
        root.style.setProperty('--theme', memberInfo[memberName || ''] || '');
      }
    };

    logout();
    getUserGreeting();
  }, []);

  // Return null or any JSX element here, or you can wrap the useEffect inside the component's body
  return null; // Example: Returning null since LogoutComponent doesn't render anything directly
};

export default LogoutComponent;

