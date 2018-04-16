import * as React from 'react';

// Component properties
interface ComponentProps {
  name: string;
  accept: string;
  onChange: (files: FileList) => void;
  multiple?: boolean;
}

// Component state
interface ComponentState {}

class FileInput extends React.Component<ComponentProps, ComponentState> {
  public render() {
    return (
      <div>
        <label htmlFor={this.props.name}>
          {this.props.children}
        </label>
        <input
          multiple={this.props.multiple}
          className="d-none"
          type="file"
          id={this.props.name}
          name={this.props.name}
          accept={this.props.accept}
          onChange={(e) => {
            if (e.target.files) {
              this.props.onChange(e.target.files);
            }
          }}
        />
      </div>
    );
  }
}

export default FileInput;