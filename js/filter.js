function filterItems() {
  const filterBtn = document.querySelectorAll('.filterBtn');


  filterBtn.forEach(function (filter) {
    filter.addEventListener('click', function (event) {
      console.log(event.target);
      let bodyItems = document.querySelectorAll('.filtrBody');
      let faceItems = document.querySelectorAll('.filtrFace');
      let handItems = document.querySelectorAll('.filtrHand');

      bodyItems.forEach(function (addClName) {
        addClName.classList.add('hide');
        console.log('console inside', bodyItems);
      });
      faceItems.forEach(function (addClName) {
        addClName.classList.add('hide');
      });
      handItems.forEach(function (addClName) {
        addClName.classList.add('hide');
      });


      if (event.target.classList.contains('btnBody')) {
        bodyItems.forEach(function (remClName) {
          remClName.classList.remove('hide');
        });


      } else if (event.target.classList.contains('btnFace')) {
        faceItems.forEach(function (remClName) {
          remClName.classList.remove('hide');
        });


      } else if (event.target.classList.contains('btnHands')) {
        handItems.forEach(function (remClName) {
          remClName.classList.remove('hide');
        });
      } else if (event.target.classList.contains('btnAll')) {
        bodyItems.forEach(function (remClName) {
          remClName.classList.remove('hide');
          console.log('console rem inside', bodyItems);
        });
        faceItems.forEach(function (remClName) {
          remClName.classList.remove('hide');
        });
        handItems.forEach(function (remClName) {
          remClName.classList.remove('hide');
        });

      }
    });
  })

}

filterItems();
