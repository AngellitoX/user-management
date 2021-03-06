'use strict';

System.register('Reflar/UserManagement/addStrikeControls', ['flarum/extend', 'flarum/app', 'flarum/utils/PostControls', 'flarum/components/Button', 'flarum/components/CommentPost', 'flarum/components/DiscussionPage', 'Reflar/UserManagement/components/StrikeModal'], function (_export, _context) {
    "use strict";

    var extend, app, PostControls, Button, CommentPost, DiscussionPage, StrikeModal;

    _export('default', function () {

        extend(PostControls, 'moderationControls', function (items, post) {
            var discussion = post.discussion();
            var id = post.data.attributes.id;

            if (!discussion.canStrike()) return;

            items.add('serveStrike', [m(Button, {
                icon: 'times',
                className: 'refar-usermanagement-strikeButon',
                onclick: function onclick() {
                    app.modal.show(new StrikeModal({ id: id }));
                }
            }, app.translator.trans('reflar-usermanagement.forum.post_controls.strike_button'))]);
        });
    });

    return {
        setters: [function (_flarumExtend) {
            extend = _flarumExtend.extend;
        }, function (_flarumApp) {
            app = _flarumApp.default;
        }, function (_flarumUtilsPostControls) {
            PostControls = _flarumUtilsPostControls.default;
        }, function (_flarumComponentsButton) {
            Button = _flarumComponentsButton.default;
        }, function (_flarumComponentsCommentPost) {
            CommentPost = _flarumComponentsCommentPost.default;
        }, function (_flarumComponentsDiscussionPage) {
            DiscussionPage = _flarumComponentsDiscussionPage.default;
        }, function (_ReflarUserManagementComponentsStrikeModal) {
            StrikeModal = _ReflarUserManagementComponentsStrikeModal.default;
        }],
        execute: function () {}
    };
});;
'use strict';

System.register('Reflar/UserManagement/components/AgeGenderModal', ['flarum/components/Alert', 'flarum/components/Modal', 'flarum/components/Button'], function (_export, _context) {
  "use strict";

  var Alert, Modal, Button, AgeGenderModal;
  return {
    setters: [function (_flarumComponentsAlert) {
      Alert = _flarumComponentsAlert.default;
    }, function (_flarumComponentsModal) {
      Modal = _flarumComponentsModal.default;
    }, function (_flarumComponentsButton) {
      Button = _flarumComponentsButton.default;
    }],
    execute: function () {
      AgeGenderModal = function (_Modal) {
        babelHelpers.inherits(AgeGenderModal, _Modal);

        function AgeGenderModal() {
          babelHelpers.classCallCheck(this, AgeGenderModal);
          return babelHelpers.possibleConstructorReturn(this, (AgeGenderModal.__proto__ || Object.getPrototypeOf(AgeGenderModal)).apply(this, arguments));
        }

        babelHelpers.createClass(AgeGenderModal, [{
          key: 'init',
          value: function init() {
            babelHelpers.get(AgeGenderModal.prototype.__proto__ || Object.getPrototypeOf(AgeGenderModal.prototype), 'init', this).call(this);

            this.age = m.prop(app.session.user.age());
            this.gender = m.prop(app.session.user.gender());

            this.password = m.prop('');
          }
        }, {
          key: 'className',
          value: function className() {
            return 'AgeGenderModal Modal--small';
          }
        }, {
          key: 'title',
          value: function title() {
            return app.translator.trans('reflar-usermanagement.forum.user.settings.title');
          }
        }, {
          key: 'content',
          value: function content() {

            return m(
              'div',
              { className: 'Modal-body' },
              m(
                'div',
                { className: 'Form Form--centered' },
                m(
                  'div',
                  { className: 'Form-group' },
                  m('input', { type: 'number', name: 'age', className: 'FormControl',
                    placeholder: app.session.user.age(),
                    bidi: this.age,
                    disabled: this.loading })
                ),
                m(
                  'div',
                  { className: 'Form-group' },
                  m(
                    'select',
                    { className: 'FormControl', onchange: m.withAttr('value', this.gender) },
                    this.gender() == "" ? m(
                      'option',
                      { value: '', disabled: true, selected: true },
                      app.translator.trans('reflar-usermanagement.forum.signup.gender')
                    ) : m(
                      'option',
                      { value: '', disabled: true },
                      app.translator.trans('reflar-usermanagement.forum.signup.gender')
                    ),
                    this.gender() == app.translator.trans('reflar-usermanagement.forum.signup.male') ? m(
                      'option',
                      { value: app.translator.trans('reflar-usermanagement.forum.signup.male'), selected: true },
                      app.translator.trans('reflar-usermanagement.forum.signup.male')
                    ) : m(
                      'option',
                      { value: app.translator.trans('reflar-usermanagement.forum.signup.male') },
                      app.translator.trans('reflar-usermanagement.forum.signup.male')
                    ),
                    this.gender() == app.translator.trans('reflar-usermanagement.forum.signup.female') ? m(
                      'option',
                      { value: app.translator.trans('reflar-usermanagement.forum.signup.female'), selected: true },
                      app.translator.trans('reflar-usermanagement.forum.signup.female')
                    ) : m(
                      'option',
                      { value: app.translator.trans('reflar-usermanagement.forum.signup.female') },
                      app.translator.trans('reflar-usermanagement.forum.signup.female')
                    ),
                    this.gender() == app.translator.trans('reflar-usermanagement.forum.signup.other') ? m(
                      'option',
                      { value: app.translator.trans('reflar-usermanagement.forum.signup.other'), selected: true },
                      app.translator.trans('reflar-usermanagement.forum.signup.other')
                    ) : m(
                      'option',
                      { value: app.translator.trans('reflar-usermanagement.forum.signup.other') },
                      app.translator.trans('reflar-usermanagement.forum.signup.other')
                    )
                  )
                ),
                m(
                  'div',
                  { className: 'Form-group' },
                  m('input', { type: 'password', name: 'password', className: 'FormControl',
                    placeholder: app.translator.trans('core.forum.change_email.confirm_password_placeholder'),
                    bidi: this.password,
                    disabled: this.loading })
                ),
                m(
                  'div',
                  { className: 'Form-group' },
                  m(
                    Button,
                    { className: 'Button Button--primary', loading: this.loading, type: 'submit' },
                    app.translator.trans('reflar-usermanagement.forum.user.settings.save')
                  )
                )
              )
            );
          }
        }, {
          key: 'onsubmit',
          value: function onsubmit(e) {
            e.preventDefault();

            if (this.loading) return;

            this.loading = true;

            app.request({
              url: app.forum.attribute('apiUrl') + '/reflar/usermanagement/attributes',
              method: 'POST',
              data: { "gender": this.gender(), "age": this.age(), "password": this.password() },
              errorHandler: this.onerror.bind(this)
            }).then(this.success.bind(this));
          }
        }, {
          key: 'success',
          value: function success(response) {
            app.alerts.show(this.successAlert = new Alert({ type: 'success', children: app.translator.trans('reflar-usermanagement.forum.user.settings.success') }));
            app.modal.close();
          }
        }, {
          key: 'onerror',
          value: function onerror(error) {
            if (error.status === 401) {
              error.alert.props.children = app.translator.trans('core.forum.change_email.incorrect_password_message');
              this.loading = false;
            }

            babelHelpers.get(AgeGenderModal.prototype.__proto__ || Object.getPrototypeOf(AgeGenderModal.prototype), 'onerror', this).call(this, error);
          }
        }]);
        return AgeGenderModal;
      }(Modal);

      _export('default', AgeGenderModal);
    }
  };
});;
'use strict';

System.register('Reflar/UserManagement/components/ModStrikeModal', ['flarum/components/Modal', 'flarum/components/Button', 'flarum/helpers/humanTime', 'flarum/components/FieldSet'], function (_export, _context) {
  "use strict";

  var Modal, Button, humanTime, FieldSet, ModStrikeModal;
  return {
    setters: [function (_flarumComponentsModal) {
      Modal = _flarumComponentsModal.default;
    }, function (_flarumComponentsButton) {
      Button = _flarumComponentsButton.default;
    }, function (_flarumHelpersHumanTime) {
      humanTime = _flarumHelpersHumanTime.default;
    }, function (_flarumComponentsFieldSet) {
      FieldSet = _flarumComponentsFieldSet.default;
    }],
    execute: function () {
      ModStrikeModal = function (_Modal) {
        babelHelpers.inherits(ModStrikeModal, _Modal);

        function ModStrikeModal() {
          babelHelpers.classCallCheck(this, ModStrikeModal);
          return babelHelpers.possibleConstructorReturn(this, (ModStrikeModal.__proto__ || Object.getPrototypeOf(ModStrikeModal)).apply(this, arguments));
        }

        babelHelpers.createClass(ModStrikeModal, [{
          key: 'init',
          value: function init() {
            var _this2 = this;

            babelHelpers.get(ModStrikeModal.prototype.__proto__ || Object.getPrototypeOf(ModStrikeModal.prototype), 'init', this).call(this);

            this.user = this.props.user;

            app.request({
              method: 'GET',
              url: app.forum.attribute('apiUrl') + '/strike/' + this.user.data.id
            }).then(function (response) {
              _this2.strikes = response.data;
              _this2.flatstrikes = [];
              for (i = 0; i < _this2.user.data.attributes.strikes; i++) {
                _this2.flatstrikes[i] = [];
                _this2.flatstrikes[i]['index'] = i + 1;
                _this2.flatstrikes[i]['id'] = _this2.strikes[i].attributes['id'];
                _this2.flatstrikes[i]['actor'] = _this2.strikes[i].attributes['actor'];
                _this2.flatstrikes[i]['post'] = _this2.strikes[i].attributes['post'];
                _this2.flatstrikes[i]['time'] = new Date(_this2.strikes[i].attributes['time']);
              }
              m.redraw();
              _this2.loading = false;
            });
          }
        }, {
          key: 'className',
          value: function className() {
            return 'ModStrikeModal Modal';
          }
        }, {
          key: 'title',
          value: function title() {
            var username = this.user.data.attributes.username;
            return app.translator.trans('reflar-usermanagement.forum.user.controls.modal', { username: username });
          }
        }, {
          key: 'content',
          value: function content() {
            var _this3 = this;

            return m('div', { className: 'Modal-body' }, [m('div', { className: 'Form Form--centered' }, [FieldSet.component({
              className: 'ModStrikeModal--fieldset',
              children: [this.flatstrikes !== undefined ? m('table', { className: "NotificationGrid" }, [m('thead', [m('tr', [m('td', [app.translator.trans('reflar-usermanagement.forum.modal.view.number')]), m('td', [app.translator.trans('reflar-usermanagement.forum.modal.view.content')]), m('td', [app.translator.trans('reflar-usermanagement.forum.modal.view.actor')]), m('td', [app.translator.trans('reflar-usermanagement.forum.modal.view.time')]), m('td', [app.translator.trans('reflar-usermanagement.forum.modal.view.remove')])])]), m('tbody', [this.flatstrikes.map(function (strike) {
                return [m('tr', [m('td', [strike['index']]), m('td', [m('a', { target: "_blank", href: app.forum.attribute('baseUrl') + '/d/' + strike['post'] }, [app.translator.trans('reflar-usermanagement.forum.modal.view.link')])]), m('td', [m('a', { target: "_blank", href: app.forum.attribute('baseUrl') + '/u/' + strike['actor'] }, [strike['actor']])]), m('td', [humanTime(strike['time'])]), m('td', [m('a', { className: "icon fa fa-fw fa-times", onclick: function onclick() {
                    _this3.deleteStrike(strike['id']);
                  } })])])];
              })])]) : m('tr', [m('td', [app.translator.trans('reflar-usermanagement.forum.modal.view.no_strikes')])])] })])]);
          }
        }, {
          key: 'deleteStrike',
          value: function deleteStrike(id) {

            if (this.loading) return;

            this.loading = true;

            app.request({
              method: 'Delete',
              url: app.forum.attribute('apiUrl') + '/strike/' + id
            }).then(app.modal.close(), this.loaded.bind(this));
          }
        }]);
        return ModStrikeModal;
      }(Modal);

      _export('default', ModStrikeModal);
    }
  };
});;
'use strict';

System.register('Reflar/UserManagement/components/StrikeModal', ['flarum/components/Modal', 'flarum/components/Button', 'flarum/models/Discussion'], function (_export, _context) {
    "use strict";

    var Modal, Button, Discussion, StrikeModal;
    return {
        setters: [function (_flarumComponentsModal) {
            Modal = _flarumComponentsModal.default;
        }, function (_flarumComponentsButton) {
            Button = _flarumComponentsButton.default;
        }, function (_flarumModelsDiscussion) {
            Discussion = _flarumModelsDiscussion.default;
        }],
        execute: function () {
            StrikeModal = function (_Modal) {
                babelHelpers.inherits(StrikeModal, _Modal);

                function StrikeModal() {
                    babelHelpers.classCallCheck(this, StrikeModal);
                    return babelHelpers.possibleConstructorReturn(this, (StrikeModal.__proto__ || Object.getPrototypeOf(StrikeModal)).apply(this, arguments));
                }

                babelHelpers.createClass(StrikeModal, [{
                    key: 'init',
                    value: function init() {
                        babelHelpers.get(StrikeModal.prototype.__proto__ || Object.getPrototypeOf(StrikeModal.prototype), 'init', this).call(this);

                        this.post = this.props.id;

                        this.reason = m.prop('');

                        this.time = new Date();
                    }
                }, {
                    key: 'className',
                    value: function className() {
                        return 'StrikeModal Modal';
                    }
                }, {
                    key: 'title',
                    value: function title() {
                        return app.translator.trans('reflar-usermanagement.forum.modal.post.title');
                    }
                }, {
                    key: 'content',
                    value: function content() {

                        return [m('div', { className: 'Modal-body' }, [m('div', { className: 'Form' }, [m('div', { className: 'Form-group' }, [m('label', {}, app.translator.trans('reflar-usermanagement.forum.modal.post.strike_reason')), m('textarea', {
                            rows: '3',
                            className: 'FormControl',
                            placeholder: app.translator.trans('reflar-usermanagement.forum.modal.post.reason_placeholder'),
                            oninput: m.withAttr('value', this.reason)
                        })]), m('div', { className: 'Form-group' }, [m(Button, {
                            className: 'Button Button--primary',
                            type: 'submit',
                            loading: this.loading,
                            disabled: !this.reason()
                        }, app.translator.trans('reflar-usermanagement.forum.modal.post.submit_button'))])])])];
                    }
                }, {
                    key: 'onsubmit',
                    value: function onsubmit(e) {
                        e.preventDefault();

                        this.loading = true;

                        app.request({
                            method: 'POST',
                            url: app.forum.attribute('apiUrl') + '/strike',
                            data: {
                                "post_id": this.post,
                                "reason": this.reason()
                            }
                        }).then(window.location.reload(), this.loaded.bind(this));
                    }
                }]);
                return StrikeModal;
            }(Modal);

            _export('default', StrikeModal);
        }
    };
});;
'use strict';

System.register('Reflar/UserManagement/main', ['flarum/app', 'flarum/extend', 'flarum/components/Button', 'flarum/utils/extractText', 'flarum/Model', 'flarum/utils/UserControls', 'flarum/models/Discussion', 'flarum/components/LogInButtons', 'flarum/models/User', 'flarum/components/SignUpModal', 'flarum/components/SettingsPage', 'flarum/components/UserCard', 'Reflar/UserManagement/addStrikeControls', 'Reflar/UserManagement/components/ModStrikeModal', 'Reflar/UserManagement/components/AgeGenderModal'], function (_export, _context) {
  "use strict";

  var app, extend, Button, extractText, Model, UserControls, Discussion, LogInButtons, User, SignUpModal, SettingsPage, UserCard, addStrikeControls, ModStrikeModal, AgeGenderModal;
  return {
    setters: [function (_flarumApp) {
      app = _flarumApp.default;
    }, function (_flarumExtend) {
      extend = _flarumExtend.extend;
    }, function (_flarumComponentsButton) {
      Button = _flarumComponentsButton.default;
    }, function (_flarumUtilsExtractText) {
      extractText = _flarumUtilsExtractText.default;
    }, function (_flarumModel) {
      Model = _flarumModel.default;
    }, function (_flarumUtilsUserControls) {
      UserControls = _flarumUtilsUserControls.default;
    }, function (_flarumModelsDiscussion) {
      Discussion = _flarumModelsDiscussion.default;
    }, function (_flarumComponentsLogInButtons) {
      LogInButtons = _flarumComponentsLogInButtons.default;
    }, function (_flarumModelsUser) {
      User = _flarumModelsUser.default;
    }, function (_flarumComponentsSignUpModal) {
      SignUpModal = _flarumComponentsSignUpModal.default;
    }, function (_flarumComponentsSettingsPage) {
      SettingsPage = _flarumComponentsSettingsPage.default;
    }, function (_flarumComponentsUserCard) {
      UserCard = _flarumComponentsUserCard.default;
    }, function (_ReflarUserManagementAddStrikeControls) {
      addStrikeControls = _ReflarUserManagementAddStrikeControls.default;
    }, function (_ReflarUserManagementComponentsModStrikeModal) {
      ModStrikeModal = _ReflarUserManagementComponentsModStrikeModal.default;
    }, function (_ReflarUserManagementComponentsAgeGenderModal) {
      AgeGenderModal = _ReflarUserManagementComponentsAgeGenderModal.default;
    }],
    execute: function () {

      app.initializers.add('Reflar-User-Management', function (app) {

        Discussion.prototype.canStrike = Model.attribute('canStrike');

        User.prototype.canViewStrike = Model.attribute('canViewStrike');
        User.prototype.canActivate = Model.attribute('canActivate');
        User.prototype.strikes = Model.attribute('strikes');
        User.prototype.gender = Model.attribute('gender');
        User.prototype.age = Model.attribute('age');

        extend(UserCard.prototype, 'infoItems', function (items) {
          var age = this.props.user.data.attributes['age'];
          items.add('gender', this.props.user.data.attributes.gender);
          items.add('age', app.translator.trans('reflar-usermanagement.forum.user.age', { age: age }));
        });

        extend(UserControls, 'moderationControls', function (items, user) {
          if (user.canViewStrike()) {
            items.add('strikes', Button.component({
              children: app.translator.trans('reflar-usermanagement.forum.user.controls.strike_button'),
              icon: 'times',
              onclick: function onclick() {
                app.modal.show(new ModStrikeModal({ user: user }));
              }

            }));
          }
          if ({ user: user }.user.data.attributes.isActivated == 0 && user.canActivate()) {
            items.add('approve', Button.component({
              children: app.translator.trans('reflar-usermanagement.forum.user.controls.activate_button'),
              icon: 'check',
              onclick: function onclick() {
                app.request({
                  url: app.forum.attribute('apiUrl') + '/reflar/usermanagement/attributes',
                  method: 'POST',
                  data: { username: { user: user }.user.data.attributes.username }
                }).then(function () {
                  return window.location.reload();
                });
              }

            }));
          }
        });
        SignUpModal.prototype.init = function () {
          this.username = m.prop(this.props.username || '');

          this.email = m.prop(this.props.email || '');

          this.password = m.prop(this.props.password || '');

          this.age = m.prop(this.props.age || '');

          this.gender = m.prop(this.props.gender || '');
        };

        SignUpModal.prototype.body = function () {
          return [this.props.token ? '' : m(LogInButtons, null), m(
            'div',
            { className: 'Form Form--centered' },
            m(
              'div',
              { className: 'Form-group' },
              m('input', { className: 'FormControl', name: 'username', type: 'text', placeholder: extractText(app.translator.trans('core.forum.sign_up.username_placeholder')),
                value: this.username(),
                onchange: m.withAttr('value', this.username),
                disabled: this.loading })
            ),
            app.forum.data.attributes['ReFlar-emailRegEnabled'] != 1 ? m(
              'div',
              { className: 'Form-group' },
              m('input', { className: 'FormControl', name: 'email', type: 'email', placeholder: extractText(app.translator.trans('core.forum.sign_up.email_placeholder')),
                value: this.email(),
                onchange: m.withAttr('value', this.email),
                disabled: this.loading || this.props.token && this.props.email })
            ) : '',
            this.props.token ? '' : m(
              'div',
              { className: 'Form-group' },
              m('input', { className: 'FormControl', name: 'password', type: 'password', placeholder: extractText(app.translator.trans('core.forum.sign_up.password_placeholder')),
                value: this.password(),
                onchange: m.withAttr('value', this.password),
                disabled: this.loading })
            ),
            app.forum.data.attributes['ReFlar-genderRegEnabled'] != 1 ? '' : m(
              'div',
              { className: 'Form-group' },
              m('input', { className: 'FormControl Reflar-RegValue', name: 'gender', type: 'text', placeholder: extractText(app.translator.trans('reflar-usermanagement.forum.signup.gender')),
                value: this.gender(),
                onchange: m.withAttr('value', this.gender),
                disabled: this.loading })
            ),
            app.forum.data.attributes['ReFlar-ageRegEnabled'] != 1 ? '' : m(
              'div',
              { className: 'Form-group' },
              m('input', { className: 'FormControl Reflar-RegValue', name: 'age', type: 'number', placeholder: extractText(app.translator.trans('reflar-usermanagement.forum.signup.age')),
                value: this.age(),
                onchange: m.withAttr('value', this.age),
                disabled: this.loading })
            ),
            m(
              'div',
              { className: 'Form-group' },
              m(
                Button,
                {
                  className: 'Button Button--primary Button--block',
                  type: 'submit',
                  loading: this.loading },
                app.translator.trans('core.forum.sign_up.submit_button')
              )
            )
          )];
        };

        SignUpModal.prototype.onsubmit = function (e) {
          e.preventDefault();

          this.loading = true;

          var data = this.submitData();

          app.request({
            url: app.forum.attribute('apiUrl') + '/reflar/usermanagement/register',
            method: 'POST',
            data: data,
            errorHandler: this.onerror.bind(this)
          }).then(function () {
            return window.location.reload();
          }, this.loaded.bind(this));
        };
        extend(SettingsPage.prototype, 'accountItems', function (items, user) {
          items.add('Age/Gender', Button.component({
            className: "Button",
            onclick: function onclick() {
              app.modal.show(new AgeGenderModal({ user: user }));
            } }, [app.translator.trans('reflar-usermanagement.forum.user.settings.button')]));
        });

        extend(SignUpModal.prototype, 'submitData', function (data) {
          var newData = data;
          newData['age'] = this.age();
          newData['gender'] = this.gender();
          return newData;
        });

        addStrikeControls();
      });
    }
  };
});