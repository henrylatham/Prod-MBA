// @TODO - Henry Define Product COPY sections
// - p1 - type score equal or above 16
// - p2 - type score below 16
// - default - preview mode - without user results
// Default copy is shown when result is equal to "0" which means that product screen is in preview mode or if type is "student" or "all-rounder"
// Default routes (preview routes) are same as object keys but not in camel case.
// E.g. "productStrategy" => http://localhost:3000/product-type/product-strategy
//      "allROunder"      => http://localhost:3000/product-type/all-rounder
//      "execution"       => http://localhost:3000/product-type/execution

import React, { Component } from 'react';
import './TypesCopy.scss';

const Copy = {
  productStrategy: {
    intro: (
      <p>
        Understanding your strengths and weaknesses is the first step in
        unlocking your potential as a product manager. Your skills matrix gives
        you an overview of where you{"'"}re already excelling - and where you
        still need to improve. <br />
        <br /> The below gives you a more detailed breakdown of what those areas
        mean, and some tips to help you improve.{' '}
      </p>
    ),
    p1: [
      <p key="p1">
        Unlike a stand-alone feature or OKR, good product strategy requires
        product mangers to consistently deliver features that build toward a
        coherent roadmap, which in turn enables a company to achieve its overall
        strategy.
        <br />
        <br />
        You understand how to align the business needs and strategic goals with
        an end product that solves your user{"'"}s problem (whilst also
        delivering value for the business).
        <br />
        <br />
        The better you understand the {"'"}why{"'"} behind the strategic vision,
        the more your roadmap will tie into the company direction. <br />
        <br />
        Think about the key players at your company: What do they do
        differently? How do they shape the company strategy? What unique
        insights can you take from them?
      </p>,
    ],
    p2: (
      <p>
        Unlike a stand-alone feature or OKR, good product strategy requires
        product mangers to consistently deliver features that build toward a
        coherent roadmap, which in turn enables a company to achieve its overall
        strategy.
        <br />
        <br />
        If you{"'"}re not currently confident in your impact on the wider
        company, this could be down to not having the opportunity to impact the
        product vision yet, or it may be that you feel you{"'"}re not having a
        big enough impact on the strategic goals.
        <br />
        <br />
        Before you can move forward, think about why you lack confidence in this
        area: Do you need to find a way to get more hands-on experience? Or do
        you need to improve your knowledge first?
      </p>
    ),
    default: (
      <p>
        Unlike a stand-alone feature or OKR, good product strategy requires
        product mangers to consistently deliver features that build toward a
        coherent roadmap, which in turn enables a company to achieve its overall
        strategy.
        <br />
        <br />
        If you{"'"}re not currently confident in your impact on the wider
        company, this could be down to not having the opportunity to impact the
        product vision yet, or it may be that you feel you{"'"}re not having a
        big enough impact on the strategic goals. <br />
        <br />
        Before you can move forward, think about why you lack confidence in this
        area: Do you need to find a way to get more hands-on experience? Or do
        you need to improve your knowledge first?
      </p>
    ),
  },
  execution: {
    intro: (
      <p>
        Understanding your strengths and weaknesses is the first step in
        unlocking your potential as a product manager. Your skills matrix gives
        you an overview of where you{"'"}re already excelling - and where you
        still need to improve. <br />
        <br />
        The below gives you a more detailed breakdown of what those areas mean,
        and some tips to help you improve.{' '}
      </p>
    ),
    p1: [
      <p key="p1">
        The foundation of successful product management is the ability to work
        with a cross-functional team to define, build and launch well-designed,
        stable products. <br />
        <br />
        You{"'"}ve spent time honing your skills so your tickets are easily
        understood, but could you improve the test steps and acceptance criteria
        to further streamline your communication? <br />
        <br />
        You adapt well to changing circumstances and your product market, but
        could you spend more time talking to your end users to understand how
        their needs are changing?
      </p>,
    ],
    p2: (
      <p>
        The foundation of successful product management is the ability to work
        with a cross-functional team to define, build and launch well-designed,
        stable products. <br />
        <br />
        You{"'"}re still experiencing issues with finding the right
        product-market fit, and streamlining how you work within your team. The
        key is communication. <br />
        <br />
        Talk to the people you work with to better understand where you{"'"}re
        missing the mark. Where do your tickets lack detail, what does the
        current competitive landscape look like, what tools are people you
        aspire to be like using?
      </p>
    ),
    default: (
      <p>
        The foundation of successful product management is the ability to work
        with a cross-functional team to define, build and launch well-designed,
        stable products. <br />
        <br />
        You{"'"}re still experiencing issues with finding the right
        product-market fit, and streamlining how you work within your team. The
        key is communication. <br />
        <br />
        Talk to the people you work with to better understand where you{"'"}re
        missing the mark. Where do your tickets lack detail, what does the
        current competitive landscape look like, what tools are people you
        aspire to be like using?
      </p>
    ),
  },
  influencer: {
    intro: (
      <p>
        Understanding your strengths and weaknesses is the first step in
        unlocking your potential as a product manager. Your skills matrix gives
        you an overview of where you{"'"}re already excelling - and where you
        still need to improve. <br />
        <br />
        The below gives you a more detailed breakdown of what those areas mean,
        and some tips to help you improve.{' '}
      </p>
    ),
    p1: [
      <p key="p1">
        The best product managers are able to multiply their impact. They enable
        the people around them to contribute to and own the business impact
        necessary to achieve the company’s strategy. <br />
        <br />
        You{"'"}re a leader and you inspire the people around you. <br />
        <br />
        You have clearly defined and communicated objectives. Now consider if
        those objectives are having the right impact, and whether the right
        people are reading them. <br />
        <br />
        It{"'"}s great to get buy-in from the people directly around you, now it
        {"'"}s time to think about how you can influence the people outside of
        your direct circle.
        <br />
        <br />
        Depending on your goals, this could mean more senior leadership, or it
        could be working with the sales and marketing team to impact the user
        experience before they even hit your product.{' '}
      </p>,
    ],
    p2: (
      <p>
        The best product managers are able to multiply their impact. They enable
        the people around them to contribute to and own the business impact
        necessary to achieve the company’s strategy. <br />
        <br />
        This isn{"'"}t an area you
        {"'"}re excelling at yet, but with time and the right tools you will. We
        can all inspire the people around us in different ways. <br />
        <br />
        Think about the people whose styles you admire: what is it about them
        that makes them great leaders? Reflect on why you{"'"}re doing the work
        you are doing.
        <br />
        <br />
        This can be directly related to a work or personal project: what does
        success look like? How will you know when you{"'"}ve met or exceeded
        your goals? Can you create a clear document so that someone else could
        understand this at a glance?
      </p>
    ),
    default: (
      <p>
        The best product managers are able to multiply their impact. They enable
        the people around them to contribute to and own the business impact
        necessary to achieve the company’s strategy. <br />
        <br />
        This isn{"'"}t an area you
        {"'"}re excelling at yet, but with time and the right tools you will. We
        can all inspire the people around us in different ways. <br />
        <br />
        Think about the people whose styles you admire: what is it about them
        that makes them great leaders? Reflect on why you{"'"}re doing the work
        you are doing.
        <br />
        <br />
        This can be directly related to a work or personal project: what does
        success look like? How will you know when you{"'"}ve met or exceeded
        your goals? Can you create a clear document so that someone else could
        understand this at a glance?
      </p>
    ),
  },
  customerInsight: {
    intro: (
      <p>
        Understanding your strengths and weaknesses is the first step in
        unlocking your potential as a product manager. Your skills matrix gives
        you an overview of where you{"'"}re already excelling - and where you
        still need to improve. <br />
        <br />
        The below gives you a more detailed breakdown of what those areas mean,
        and some tips to help you improve.{' '}
      </p>
    ),
    p1: [
      <p key="p1">
        To build the best products, it{"'"}s key to empathize with the people
        the product serves. To care about whether that product improves their
        lives. You{"'"}ve already grasped the importance of this, and put a lot
        of effort into validating your ideas. <br />
        <br />
        It can often feel like there aren
        {"'"}t enough hours in the day to balance everything you have to do, but
        never stop making time to fully comprehend what your users need and why.
        <br />
        <br />
        Try mixing up your approach: where are they spending time when they{"'"}
        re not on your product? How can you be a part of that and get a first
        hand look at their interactions? What drives and motivates them? Are you
        layering qualitative data on top of the quantitative data you get from
        your analytics platform to get a rounded view?
      </p>,
    ],
    p2: (
      <p>
        To build the best products, it{"'"}s key to empathize with the people
        the product serves. To care deeply about whether that product improves
        their lives. <br />
        <br />
        Talk to your customers and potential customers as often as you can. Find
        your specific target niche. Don{"'"}t just listen to their problems.
        Understand what they are, what the underlying problem might be, how
        these problems are impacting your niche - and why they are experiencing
        these problems. <br />
        <br />
        Talking to customers, or potential customers, can be scary at first, or
        seem like something you don{"'"}t have access to. <br />
        <br />
        Be creative: where do they spend their free time? Can you talk to them
        on forums, or get an introduction via a mutual friend? You might be
        surprised at the cross-over of connections on your existing social media
        platforms and your target user group. <br />
        <br />
        It doesn{"'"}t have to be a formal product interview. People love
        talking about themselves, so start by asking questions and see where the
        conversation goes from there!
      </p>
    ),
    default: (
      <p>
        To build the best products, it{"'"}s key to empathize with the people
        the product serves. To care deeply about whether that product improves
        their lives. <br />
        <br />
        Talk to your customers and potential customers as often as you can. Find
        your specific target niche. Don{"'"}t just listen to their problems.
        Understand what they are, what the underlying problem might be, how
        these problems are impacting your niche - and why they are experiencing
        these problems. <br />
        <br />
        Talking to customers, or potential customers, can be scary at first, or
        seem like something you don{"'"}t have access to. <br />
        <br />
        Be creative: where do they spend their free time? Can you talk to them
        on forums, or get an introduction via a mutual friend? You might be
        surprised at the cross-over of connections on your existing social media
        platforms and your target user group. <br />
        <br />
        It doesn{"'"}t have to be a formal product interview. People love
        talking about themselves, so start by asking questions and see where the
        conversation goes from there!
      </p>
    ),
  },
  allRounder: {
    intro: (
      <p>
        Understanding your strengths and weaknesses is the first step in
        unlocking your potential as a product manager. Your skills matrix gives
        you an overview of where you{"'"}re already excelling - and where you
        still need to improve. <br />
        <br />
        The below gives you a more detailed breakdown of what those areas mean,
        and some tips to help you improve.{' '}
      </p>
    ),
    p1: [
      <p key="p1">
        A Jack (or Jill) of all trades, and a master of many. Adaptability & a
        wide range of skills is one of the most valuable assets for any product
        manager. <br />
        <br />
        As comfortable with your team as you are with senior managers or talking
        directly to your users, you get the job done!
      </p>,
    ],
    p2: (
      <p>
        A Jack (or Jill) of all trades, and a master of many. Adaptability & a
        wide range of skills is one of the most valuable assets for any product
        manager. <br />
        <br />
        As comfortable with your team as you are with senior managers or talking
        directly to your users, you get the job done!
      </p>
    ),
    default: (
      <p>
        A Jack (or Jill) of all trades, and a master of many. Adaptability & a
        wide range of skills is one of the most valuable assets for any product
        manager. <br />
        <br />
        As comfortable with your team as you are with senior managers or talking
        directly to your users, you get the job done!
      </p>
    ),
  },
  student: {
    intro: (
      <p>
        Understanding your strengths and weaknesses is the first step in
        unlocking your potential as a product manager. Your skills matrix gives
        you an overview of where you{"'"}re already excelling - and where you
        still need to improve. <br />
        <br />
        The below gives you a more detailed breakdown of what those areas mean,
        and some tips to help you improve.{' '}
      </p>
    ),
    p1: [
      <p key="p1">
        As The Student, you{"'"}re inquisitive, curious and unstoppable on your
        path to becoming an incredible product manager. You know what you don
        {"'"}t yet know, and that is half the battle. <br />
        <br />
        Students have a growth mindset that welcomes new challenges and
        significant change. Great!
      </p>,
    ],
    p2: (
      <p>
        As The Student, you{"'"}re inquisitive, curious and unstoppable on your
        path to becoming an incredible product manager. You know what you don
        {"'"}t yet know, and that is half the battle. <br />
        <br />
        Students have a growth mindset that welcomes new challenges and
        significant change. Great!
      </p>
    ),
    default: (
      <p>
        As The Student, you{"'"}re inquisitive, curious and unstoppable on your
        path to becoming an incredible product manager. You know what you don
        {"'"}t yet know, and that is half the battle. <br />
        <br />
        Students have a growth mindset that welcomes new challenges and
        significant change. Great!
      </p>
    ),
  },
};

export default class TypesCopy extends Component {
  render() {
    const { type, typeResult } = this.props;
    const copy = Copy[type];
    return (
      <>
        <div className="intro">
          <h2>Intro</h2>
          <div>{copy.intro}</div>
        </div>
        <div className="description">
          <h3>Strengths & Weaknesses</h3>
          {typeResult === 0 || type === 'student' || type === 'allRounder' ? (
            <div>{copy.default}</div>
          ) : (
            <div>{typeResult >= 16 ? copy.p1 : copy.p2}</div>
          )}
        </div>
      </>
    );
  }
}
