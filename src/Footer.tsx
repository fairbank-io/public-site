import * as React from 'react';

class Footer extends React.Component<{}, {}> {
  public render(): JSX.Element {
    return (
      <section className="footer">
        <div className="container">
          <div className="row">
            <div className="col-md-10 offset-md-1">
              <p>Copyright (c) 2018 FairBank LLC. La información desplegada en este sitio puede ser modificada o
                retirada a discreción de la empresa. Cualquier despliegue de marcas comerciales es de carácter
                ilustrativo y sujeto a las licencias aplicables. Favor de contactarnos en info@fairbank.io para
                mayores informes o aclaraciones.</p>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

// Module exports
export default Footer;