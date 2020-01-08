/* Utilisation de JQuery */
$('#formulaire2').on('submit', async function (e) {
    e.preventDefault(); //force la page à rester sur elle même
  
    const data = {};
  
    /* Creation de la constante "inputs" qui est en fait un tableau de tous les input trouvés dans notre formulaire "form2" */
    const inputs = $(this).find('input');
  
    for (const input of inputs) {
      if (input.name === 'photo' && input.files[0]) {
        data[input.name] = await new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.readAsDataURL(input.files[0]);
          reader.onload = () => resolve(reader.result);
          reader.onerror = () => reject(new Error('Invalid image'));
        });
      } else {
        data[input.name] = input.value;
      }
    }
  
    $.ajax({
      type: 'POST',
      url: 'http://localhost:3000/print',
      contentType: 'application/json',
      dataType: 'json',
      data: JSON.stringify(data)
    })
      .done(res => {
        const { path } = res;
        window.open(path, '_blank').focus();
      });
  });
