import * as React from 'react';
import { Document } from 'state/data';
import FileInput from 'components/FileInput';

// Component properties
interface ComponentProps {
  documents: Document[];
  onUploadRequest: (name: string, f: File) => void;
}

// Component state
interface ComponentState {}

interface FileEntry {
  name: string;
  description: string;
}

let supportedFiles = {
  'io.fairbank.avatar': {
    name: 'Fotografía / Selfie',
    description: 'Fotografía reciente que permita ver el rostro completo del usuario.'
  },
  'io.fairbank.official-id': {
    name: 'Identificación Oficial',
    description: 'Deberá ser alguna identificación emitida por el gobierno local, por ejemplo: pasaporte,' +
    'documento nacional de identidad, licencia de conducir, etc.'
  },
  'io.fairbank.address-voucher': {
    name: 'Comprobante de Domicilio',
    description: 'Deberá ser de algun servicio local como: agua, electricidad, telefonía fija, etc.' +
    'Y con vigencia no mayor a 3 meses.'
  }
};

class AccountFiles extends React.Component<ComponentProps, ComponentState> {
  public render() {
    return (
      <table className="table table-striped">
        <thead>
        <tr>
          <th scope="col">Nombre</th>
          <th scope="col" className="d-none d-md-table-cell">Descripción</th>
          <th scope="col">Estado</th>
        </tr>
        </thead>
        <tbody>
          {
            this.props.documents.map((d) => {
              // Get status markers
              let status: string[] = ['badge', 'badge-btn'];
              let statusLbl: string = '';
              switch (d.status) {
                case 'REQUIRED':
                  statusLbl = 'Requerido';
                  status.push('badge-danger');
                  break;
                case 'PENDING_VALIDATION':
                  statusLbl = 'Validación Pendiente';
                  status.push('badge-dark');
                  break;
                case 'OK':
                  statusLbl = 'Validado';
                  status.push('badge-success');
                  break;
                default:
                  statusLbl = 'No Identificado';
                  status.push('badge-secondary');
                  break;
              }

              // Get data
              let md: FileEntry = supportedFiles[d.name];
              return (
                <tr key={d.name}>
                  <td>{md ? md.name : d.name}</td>
                  <td className="d-none d-md-table-cell">{md ? md.description : d.description}</td>
                  <td>
                    <FileInput
                      name={d.name}
                      accept={d.valid_types.join(',')}
                      onChange={(f) => this.props.onUploadRequest(d.name, f[0])}
                    >
                      <span className={status.join(' ')}>{statusLbl}</span>
                    </FileInput>
                  </td>
                </tr>
              );
            })
          }
        </tbody>
      </table>
    );
  }
}

export default AccountFiles;