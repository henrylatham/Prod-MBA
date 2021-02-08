// @flow
import React, { Component } from 'react';
import './Modal.scss';

import { Card, Button } from '..';

type Props = {
  onAccept: Function,
  onDecline: Function,
  isOpen: boolean,
};

const termsUrl = 'https://prod.mba/legal';

export default class Modal extends Component<Props> {
  constructor() {
    super();
    this.state = {
      isOpen: true,
    };
  }
  onClick = e => {
    this.props.onAccept();
  };
  render() {
    const { onDecline, img, title, description, isOpen } = this.props;
    const ACTIVE_CAMPAIGN_FORM_ACTION_URL =
      'https://productmastery.activehosted.com/proc.php?';

    const formId = 1;

    let classes = 'modalBg';
    if (!isOpen) {
      classes = 'modalBg hidden';
    }

    return (
      <div className={classes}>
        <div className="modal">
          <Card cardModal="cardModal">
            <img src={img} alt="Product types" className="modale_image_block" />
            <div className="modal__title">{title}</div>
            <div className="modal__text">{description}</div>
            <div className="modal__btnContainer">
              <form
                action={ACTIVE_CAMPAIGN_FORM_ACTION_URL}
                method="POST"
                id="_form_newsletter_"
                className="activeCampaign__form"
                noValidate
                target="hiddenFrame"
              >
                <input type="hidden" name="u" value={formId} />
                <input type="hidden" name="f" value={formId} />
                <input type="hidden" name="s" />
                <input type="hidden" name="c" value="0" />
                <input type="hidden" name="m" value="0" />
                <input type="hidden" name="act" value="sub" />
                <input type="hidden" name="v" value="2" />
                <div className="activeCampaign__form_content">
                  <div className="_activeCampaign-fields">
                    <div className="_field-wrapper">
                      <input
                        type="text"
                        name="email"
                        placeholder="Enter email"
                        required
                        // value={email}
                      />
                    </div>
                  </div>
                  <div className="_button-wrapper">
                    <Button
                      key="cancelButton"
                      type="tertiary"
                      label="No Thanks"
                      onClick={onDecline}
                    />
                    <Button
                      id="_form_newsletter_submit"
                      className="_submit"
                      key="confirmButton"
                      type="primary"
                      label="Yes, please!"
                      onClick={this.onClick.bind(this)}
                    />
                  </div>
                  <p className="modal__terms">
                    By registering for our email series, you agree to our{' '}
                    <a
                      href={termsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Terms & Conditions
                    </a>
                  </p>
                  <div className="_clear-element"></div>
                </div>
                <div classNames="_form-thank-you"></div>
              </form>
            </div>
          </Card>
        </div>
        <iframe
          title="Form Helper"
          name="hiddenFrame"
          width="0"
          height="0"
          border="0"
          style={{ display: 'none' }}
        ></iframe>
      </div>
    );
  }
}
