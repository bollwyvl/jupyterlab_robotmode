/*
  Copyright (c) 2023 MarketSquare
  Distributed under the terms of the BSD-3-Clause License
*/

import type { Rule } from '@codemirror/legacy-modes/mode/simple-mode';

/**
 * An implementation of the CodeMirror simple mode object
 * https://github.com/codemirror/CodeMirror/blob/master/addon/mode/simple.js
 *
 * Optionally generic over [S]tate names and [T]okens
 */
interface ISimpleState<S, T> extends Rule {
  /**
   * The regular expression that matches the token. May be a string or a
   * regex object. When a regex, the ignoreCase flag will be taken into
   * account when matching the token. This regex has to capture groups when
   * the token property is an array. If it captures groups, it must capture
   * all of the string (since JS provides no way to find out where a group
   * matched).
   */
  regex: string | RegExp;
  /**
   * An optional token style. Multiple styles can be specified by separating
   * them with dots or spaces. When this property holds an array of token styles,
   * the regex for this rule must capture a group for each array item.
   */
  token?: T | null | (T | null)[];
  /**
   * When true, this token will only match at the start of the line.
   * (The ^ regexp marker doesn't work as you'd expect in this context because
   * of limitations in JavaScript's RegExp API.)
   */
  sol?: boolean;
  /**
   * When a next property is present, the mode will transfer to the state
   * named by the property when the token is encountered.
   */
  next?: S;
  /**
   * Like next, but instead replacing the current state by the new state, the
   * current state is kept on a stack, and can be returned to with the pop
   * directive.
   */
  push?: S;
  /**
   * When true, and there is another state on the state stack, will cause the
   * mode to pop that state off the stack and transition to it.
   */
  pop?: boolean;
  /**
   * Can be used to embed another mode inside a mode. When present, must hold
   * an object with a spec property that describes the embedded mode, and an
   * optional end end property that specifies the regexp that will end the
   * extent of the mode. When a persistent property is set (and true), the
   * nested mode's state will be preserved between occurrences of the mode.
   */
  mode?: {
    spec: string;
    end?: string | RegExp;
    persistent?: boolean;
  };
  /**
   * When true, this token changes the indentation to be one unit more than
   * the current line's indentation.
   */
  indent?: boolean;
  /**
   * When true, this token will pop one scope off the indentation stack.
   */
  dedent?: boolean;
  /**
   * If a token has its dedent property set, it will, by default, cause lines
   * where it appears at the start to be dedented. Set this property to false
   * to prevent that behavior.
   */
  dedentIfLineStart?: boolean;
}

/**
 * Special mode values interpreted by simple modes
 */
export interface ISimpleMeta<S> extends CodeMirror.Mode<S> {
  /**
   * Keys of simple states that should not be indented.
   */
  dontIndentStates?: S[];
}

/**
 * A string-keyed set of simple state rule lists.
 */
export type TSimpleStates<S = string, T = any> = {
  [key: string]: ISimpleState<S, T>[];
};

/**
 * The special-case for mode metadata in an otherwise state-keyed map.
 */
export interface ISimpleLanguageData<S, T> {
  languageData: ISimpleMeta<S>;
}

/**
 * A top-level simple state.
 */
export interface ISimpleTopState<S, T>
  extends Partial<TSimpleStates<S, T> & ISimpleMeta<S, T>> {
  start: Rule[];
}
