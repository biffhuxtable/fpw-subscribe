if( typeof init === 'undefined' && ( window.location.pathname.match(/\/item\/detail\//) || window.location.pathname.match(/\/sharedfiles\/filedetails\//) ) ) {

  const init = function() {

    var site = 'console';
    if (window.location.pathname.match(/\/sharedfiles\/filedetails\//)) {
      site = 'steam';
    }

    var isConsoleWrestler = false;
    if(document.getElementsByClassName('list-group-item').length){
      isConsoleWrestler = true;
    }

    if(isConsoleWrestler || site == 'steam') {

      var partCount = 0;
      var subscribedPartCount = 0;

      if(site == 'console') {
        const collection = document.getElementsByClassName("btn-xs btn-default");
        subscribedPartCount = document.getElementsByClassName('fa-check').length;
        partCount = collection.length;
      }
      else {
        var requiredItemsContainer = document.getElementById('RequiredItems')
        var requiredItems = requiredItemsContainer.children;
        subscribedPartCount = document.getElementsByClassName('requiredItemSubscribed').length;
        partCount = requiredItems.length;
      }

      var s = document.createElement('script');
      s.src = chrome.runtime.getURL('fpw.js');
      (document.head || document.documentElement).appendChild(s);

      const style = document.createElement('style');
      style.innerHTML = `
        .fpws{
          backdrop-filter:blur(5px);
          background-color:rgba(255,255,255,.45);
          border-radius:8px;
          bottom:20px;
          padding:10px;
          position:fixed;
          right:20px;
          color:black;
          z-index:99;
        }

        .fpws-info{
          margin-bottom: 10px;
          display: flex;
          justify-content: space-between;
        }

        .fpws-info img{
          height: 16px;
        }

        .fpws-btn{
          background-image: none;
          border-radius: 4px;
          border: 1px solid transparent;
          cursor: pointer;
          display: inline-block;
          font-size: 14px;
          margin:5px;
          padding: 6px 12px;
          text-align: center;
          touch-action: manipulation;
          vertical-align: middle;
          white-space: nowrap;
          width: 10em;
        }

        .fpws-btn-unsub{
          background:#d64541
        }

        .fpws-btn-sub{
          background:#3fc380
        }

        .fpws-btn:hover:enabled{
          filter: brightness(110%);
        }

        .fpws-btn:disabled{
          opacity: 0.45;
        }
      `;
      (document.head || document.documentElement).appendChild(style);

      const container = document.createElement('div');
      container.className = 'fpws';

      const info = document.createElement('div');
      info.innerHTML = 'Subscribed to ' + subscribedPartCount + ' of ' + partCount;
      info.className = 'fpws-info';

      const icon = document.createElement('img');
      icon.src = chrome.runtime.getURL('images/icon16.png');

      const subButton = document.createElement('button');
      subButton.innerHTML = 'Subscribe All';
      subButton.className = 'fpws-btn fpws-btn-sub';
      subButton.setAttribute( "onClick", "toggleSub(true)" );

      const unsubButton = document.createElement('button');
      unsubButton.innerHTML = 'Unsubscribe All';
      unsubButton.className = 'fpws-btn fpws-btn-unsub';
      unsubButton.setAttribute( "onClick", "toggleSub(false)" );

      if(subscribedPartCount == partCount){
        subButton.disabled = true;
      }

      if(subscribedPartCount == 0){
        unsubButton.disabled = true;
      }

      info.appendChild(icon);
      container.appendChild(info);
      container.appendChild(subButton);
      container.appendChild(unsubButton);
      document.body.appendChild(container);
    }

  }

  init();
}