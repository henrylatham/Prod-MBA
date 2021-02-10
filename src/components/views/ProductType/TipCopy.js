/* eslint react/no-unescaped-entities: 0 */ // --> OFF
import React, { Component } from 'react';

const Copy = {
  productStrategy: {
    tip: (
      <p>
        Understanding how many moving parts interact with each other - and the
        sequential steps required to ultimately solve all your user{"'"}s &
        business{"'"} problems - is your superpower.
        <br />
        <br /> Strategists are equal parts confident and decisive, and you{"'"}
        ve got both in bucket loads. Awesome!{' '}
      </p>
    ),
  },
  execution: {
    tip: (
      <p>
        Your mantra is, {"'"}always be shipping{"'"}, and it shows. As someone
        that{"'"}s laser-focused on releasing stable products, your tickets are
        slick, your acceptance criteria are on point, and you{"'"}re a stickler
        for meeting deadlines.
        <br />
        <br /> You adapt to the ever-changing needs of the market, and relish a
        challenge. Good work!{' '}
      </p>
    ),
  },
  influencer: {
    tip: (
      <p>
        You{"'"}re confident, charismatic and charming. An influencer
        understands the needs of users, but excels at acting as a force
        multiplier in their team, rallying stakeholders around an idea or
        strategy to make sure it gets done.
        <br />
        <br /> You bring out the best in all those around you and are a force to
        be reckoned with. Awesome!{' '}
      </p>
    ),
  },
  customerInsight: {
    tip: (
      <p>
        You{"'"}re the Leonardo Da Vinci of the product management world. Your
        ideas are big, they{"'"}ll change the world, and you{"'"}ve got the
        experience to get it done. You know what your customers want, and have
        the tenacity to see it through.
        <br />
        <br /> You{"'"}re confident and aren{"'"}t fazed by new challenges.
        Bring it on!{' '}
      </p>
    ),
  },
  allRounder: {
    tip: (
      <p>
        A Jack (or Jill) of all trades, and a master of many. Adaptability & a
        wide range of skills is one of the most valuable assets for any product
        manager.
        <br />
        <br /> As comfortable with your team as you are with senior managers or
        talking directly to your users, you get the job done!
      </p>
    ),
  },
  student: {
    tip: (
      <p>
        As The Student, you{"'"}re inquisitive, curious and unstoppable on your
        path to becoming an incredible product manager. You know what you don
        {"'"}t yet know, and that is half the battle.
        <br />
        <br /> Students have a growth mindset that welcomes new challenges and
        significant change. Great!
      </p>
    ),
  },
};

export default class TipCopy extends Component<any> {
  render() {
    const { type } = this.props;
    const copy = Copy[type];
    return (
      <>
        <div className="tip">
          <div>{copy.tip}</div>
        </div>
      </>
    );
  }
}
