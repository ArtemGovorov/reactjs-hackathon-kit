const figlet = require('figlet');

export default function (message: string) {


  return new Promise<string>(

    (resolve, reject) => {

      figlet.text(

        `Let's Go!`,
        {
          font: '',
          horizontalLayout: 'default',
          verticalLayout: 'default'
        },

        function (err, data) {
          if (err) {
            reject(err);
            return;
          }
          console.log(data, '\n\n');
          resolve(data);
        }
      );

    });

}

