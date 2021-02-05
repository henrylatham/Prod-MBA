// @flow
import React, { Component } from 'react';
import './Modal.scss';

import { Card, Button } from '../';

type Props = {
  onAccept: Function,
  onDecline: Function,
};

export default class Modal extends Component<Props> {
  constructor() {
    super();
    this.state = {
      isOpen: true,
    }
  }
  onClick = (e) => {
    this.props.onAccept();
  }
  render() {
    const { onAccept, onDecline, productType, title, description, isOpen, email } = this.props;
    const ACTIVE_CAMPAIGN_FORM_ACTION_URL = 'https://productmastery.activehosted.com/proc.php?';
    let classes = 'modalBg';
    if (!isOpen) {
      classes = 'modalBg hidden'
    };

    return (
      <div className={classes}>
        <div className="modal">
          <Card cardModal="cardModal">
            <div className="modal__title">{title}</div>

            <div className='modale_image_block'/>

            <div className="modal__text">{description}</div>
            <div className="modal__btnContainer">

            <form
              action={ACTIVE_CAMPAIGN_FORM_ACTION_URL}
              method="POST"
              id="_form_newsletter_"
              className="activeCampaign__form"
              noValidate
              target='hiddenFrame'
            >
              <input type="hidden" name="u" value={productType} />
              <input type="hidden" name="f" value={productType} />
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
                      value={email}
                    />
                  </div>
                </div>
                <div className="_button-wrapper">
                  <Button
                    id="_form_newsletter_submit"
                    className="_submit"
                    type="submit"

                    key='confirmButton'
                    type='primary'
                    label='Sure!'
                    onClick={this.onClick.bind(this)}
                  />
                  <Button
                    key='cancelButton'
                    type='tertiary'
                    label='No Thanks'
                    onClick={onDecline}
                  />
                </div>
                <div className="_clear-element"></div>
              </div>
              <div classNames="_form-thank-you"></div>
            </form>






            </div>
          </Card>
        </div>
        <iframe name="hiddenFrame" width="0" height="0" border="0" style={{ display: "none" }}></iframe>
      </div>
    );
  }
}
