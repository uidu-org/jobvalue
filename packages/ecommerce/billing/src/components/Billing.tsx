import FieldGeosuggest from '@uidu/field-geosuggest';
import FieldText from '@uidu/field-text';
import FieldTextarea from '@uidu/field-textarea';
import Select from '@uidu/select';
import React, { useState } from 'react';

export default function Billing(props: any) {
  const [billingKind, setBillingKind] = useState('individual');
  return (
    <>
      <Select
        styles={{
          control: (base, state) => ({
            ...base,
            backgroundColor: '#fff',
          }),
          valueContainer: (base, state) => ({
            ...base,
            padding:
              state.isMulti && state.hasValue
                ? 'calc(.5rem - 3px) .5rem'
                : '.75rem 1rem',
          }),
        }}
        label="Tipologia"
        name="billing_kind"
        options={[
          {
            id: 'company',
            name: 'Azienda',
          },
          {
            id: 'individual',
            name: 'Ditta individuale / Libero professionista',
          },
          {
            id: 'personal',
            name: 'Persona fisica',
          },
        ]}
        onChange={(_name, value) => setBillingKind(value)}
        value={billingKind}
      />
      {billingKind === 'company' ? (
        <FieldText
          name="billing_company_name"
          label="Ragione sociale"
          required
        />
      ) : (
        <div className="row">
          <div className="col-sm-6">
            <FieldText
              name="billing_first_name"
              label="Nome su fattura"
              required
            />
          </div>
          <div className="col-sm-6">
            <FieldText
              name="billing_first_name"
              label="Cognome su fattura"
              required
            />
          </div>
        </div>
      )}
      {billingKind !== 'personal' && (
        <>
          <div className="row">
            <div className="col-sm-6">
              <FieldText type="email" name="billing_pec" label="PEC" required />
            </div>
            <div className="col-sm-6">
              <FieldText
                name="billing_code"
                label="Codice destinatario"
                placeholder="0000000"
                required
              />
            </div>
          </div>
        </>
      )}
      <div className="row">
        <div className={`col-sm-${billingKind === 'personal' ? 12 : 6}`}>
          <FieldText
            name="billing_fiscal_code"
            label="Codice fiscale"
            required
          />
        </div>
        {billingKind !== 'personal' && (
          <div className="col-sm-6">
            <FieldText name="billing_vat_code" label="Partita IVA" required />
          </div>
        )}
      </div>
      <FieldTextarea
        label="Indirizzo"
        name="billing_address"
        required={billingKind === 'company'}
      />
      <FieldGeosuggest name="billing_city" label="Comune" required />
      <FieldText type="hidden" name="billing_zip" label="CAP" required />
      <FieldText
        type="hidden"
        name="billing_province"
        label="Provincia (Sigla)"
        required
      />
    </>
  );
}

{
  /* <fieldset>
  <div class="form-group">
    <label>* Indirizzo</label>
    <%= f.text_area :billing_address, placeholder: 'Indirizzo', class: 'form-control', required: params[:billing_kind] == 'company' %>
  </div>
  <div class="form-group">
    <label>* Comune</label>
    <div>
      <%= f.text_field :billing_city, placeholder: 'Comune', class: 'form-control js-select-comuni', required: true, autocomplete: 'new-password' %>
    </div>
  </div>
  <div class="form-group d-none">
    <label>* Cap</label>
    <%= f.text_field :billing_zip, placeholder: 'CAP', class: 'form-control js-select-zip', required: true %>
  </div>
  <div class="form-group d-none">
    <label>Provincia</label>
    <%= f.text_field :billing_province, placeholder: 'Provincia (Sigla)', class: 'form-control', required: true %>
  </div>
</fieldset>

<script>
  $(document).ready(function() {
    'use strict';

    $(document).on('change', '.billing-kind', function(e) {
      <% if @product %>
        location.href = '?product_id=<%= @product.id %>&billing_kind=' + e.target.value
      <% else %>
        location.href = '?billing_kind=' + e.target.value
      <% end %>
    })

    var cities = new Bloodhound({
      datumTokenizer: Bloodhound.tokenizers.obj.whitespace('name'),
      queryTokenizer: Bloodhound.tokenizers.whitespace,
      remote: {
        url: '/ajaxes/comuni.json?q[name_start]=%QUERY',
        wildcard: '%QUERY'
      }
    });

    $('.js-select-comuni').typeahead(null, {
      name: 'cities',
      display: 'name',
      source: cities
    });

    var substringMatcher = function(strs) {
      return function findMatches(q, cb) {
        var matches, substringRegex;
        // an array that will be populated with substring matches
        matches = [];
        // regex used to determine if a string contains the substring `q`
        substringRegex = new RegExp(q, 'i');
        // iterate through the pool of strings and for any string that
        // contains the substring `q`, add it to the `matches` array
        $.each(strs, function(i, str) {
          if (substringRegex.test(str)) {
            matches.push(str);
          }
        });

        cb(matches);
      };
    };

    $(document).on('typeahead:select', '.js-select-comuni', function(ev, suggestion) {
      console.log('Selection', suggestion);
      // province
      $('#<%= namespace %>_billing_province').val(suggestion.province);
      if (suggestion.caps && suggestion.caps.length == 1) {
        $('#<%= namespace %>_billing_zip').closest('.form-group').addClass('d-none');
        $('#<%= namespace %>_billing_zip').val(suggestion.caps[0]);
      } else {
        $('#<%= namespace %>_billing_zip').closest('.form-group').removeClass('d-none');
        $('.js-select-zip').typeahead({
          highlight: true
        }, {
          name: 'zips',
          source: substringMatcher(suggestion.caps),
          limit: 25,
        });
      }
    });
    <% if params[:billing_kind] != 'personal' %>
      var cleave = new Cleave('#<%= namespace %>_billing_vat_code', {
        numericOnly: true,
        blocks: [11]
      });
    <% end %>
    var fiscalCode = new Cleave('#<%= namespace %>_billing_fiscal_code', {
      // numericOnly: true,
      uppercase: true,
      blocks: [16]
    });
    <% if namespace != 'organization' %>
      var stripe = Stripe('<%= Rails.application.secrets[:stripe][:publishable_key] %>');

      function registerElements(elements, exampleName) {
        var formClass = '.' + exampleName;
        var example = document.querySelector(formClass);

        var form = document.querySelector('form');
        var error = form.querySelector('.error');
        var errorMessage = error.querySelector('.message');

        function enableInputs() {
          Array.prototype.forEach.call(
            form.querySelectorAll(
              "input[type='text'], input[type='email'], input[type='tel'] textarea"
            ),
            function(input) {
              input.removeAttribute('disabled');
            }
          );
        }

        function disableInputs() {
          Array.prototype.forEach.call(
            form.querySelectorAll(
              "input[type='text'], input[type='email'], input[type='tel'] textarea"
            ),
            function(input) {
              input.setAttribute('disabled', 'true');
            }
          );
        }

        function triggerBrowserValidation() {
          // The only way to trigger HTML5 form validation UI is to fake a user submit
          // event.
          var submit = document.createElement('input');
          submit.type = 'submit';
          submit.style.display = 'none';
          form.appendChild(submit);
          submit.click();
          submit.remove();
        }

        // Listen for errors from each Element, and show error messages in the UI.
        var savedErrors = {};
        elements.forEach(function(element, idx) {
          element.on('change', function(event) {
            if (event.error) {
              error.classList.remove('d-none');
              savedErrors[idx] = event.error.message;
              errorMessage.innerText = event.error.message;
            } else {
              savedErrors[idx] = null;

              // Loop over the saved errors and find the first one, if any.
              var nextError = Object.keys(savedErrors)
                .sort()
                .reduce(function(maybeFoundError, key) {
                  return maybeFoundError || savedErrors[key];
                }, null);

              if (nextError) {
                // Now that they've fixed the current error, show another one.
                errorMessage.innerText = nextError;
              } else {
                // The user fixed the last error; no more errors.
                error.classList.add('d-none');
              }
            }
          });
        });

        // Listen on the form's 'submit' handler...
        form.addEventListener('submit', function(e) {
          e.preventDefault();

          // Trigger HTML5 validation UI on the form if any of the inputs fail
          // validation.
          var plainInputsValid = true;
          Array.prototype.forEach.call(form.querySelectorAll('input'), function(
            input
          ) {
            if (input.checkValidity && !input.checkValidity()) {
              plainInputsValid = false;
              return;
            }
          });
          if (!plainInputsValid) {
            triggerBrowserValidation();
            return;
          }

          // Show a loading screen...
          example.classList.add('submitting');


          <% if params[:method] && params[:method] == 'iban' %>
            <% if current_user %>
              var name = '<%= current_user.display_name %>';
              var email = '<%= current_user.email %>';
            <% else %>
              var name = example.querySelector('#user_first_name').value + ' ' + example.querySelector('#user_last_name').value;
              var email = example.querySelector('user_email').value;
            <% end %>
            var sourceData = {
              type: 'sepa_debit',
              currency: 'eur',
              owner: {
                name: name,
                email: email,
              },
              mandate: {
                // Automatically send a mandate notification email to your customer
                // once the source is charged.
                notification_method: 'email',
              },
            };
            // Call `stripe.createSource` with the IBAN Element and additional options.
            stripe.createSource(elements[0], sourceData).then(function(result) {
              // Stop loading!
              example.classList.remove('submitting');

              if (result.source) {
                // Inform the customer that there was an error.
                // If we received a token, show the token ID.
                enableInputs();
                example.querySelector('#token').value = result.source.id;
                example.classList.add('submitted');
                form.submit();
              } else {
                console.log(result.error)
                // Otherwise, un-disable inputs.
                enableInputs();
              }
            });
          <% else %>
            // Gather additional customer data we may have collected in our form.
            // Use Stripe.js to create a token. We only need to pass in one Element
            // from the Element group in subscription to create a token. We can also pass
            // in the additional customer data we collected in our form.
            var cardElement = elements[0];
            var data = $(form).serialize();
            // Disable all inputs.
            disableInputs();

            stripe.createToken(cardElement).then(({ token }) => {
              data += '&stripeToken=' + token.id;
              window.$.ajax({
                url: '<%= paymentPath %>',
                type: 'POST',
                data: data,
                success: function(response) {
                  stripe.handleCardPayment(response.paymentIntent.client_secret, cardElement).then(function(result) {
                    // Stop loading!
                    example.classList.remove('submitting');

                    if (result.paymentIntent) {
                      // If we received a token, show the token ID.
                      enableInputs();
                      example.classList.add('submitted');
                      form.submit();
                    } else if (result.error) {
                      // Otherwise, un-disable inputs.
                      example.classList.remove('submitted');
                      enableInputs();
                      window.alert(result.error.message)
                    }
                  });
                }
              });
            });
          <% end %>
        });
      }

      var elements = stripe.elements({
        fonts: [
          {
            cssSrc: 'https://fonts.googleapis.com/css?family=Roboto',
          },
        ],
        locale: 'auto'
      });

      var style = {
        base: {
          fontFamily: 'Roboto Condensed, sans-serif',
          fontSize: '16px',
        },
        invalid: {
          iconColor: '#FFC7EE',
          color: '#FFC7EE',
        },
      }

      <% if params[:method] && params[:method] == 'iban' %>
        // Create an instance of the iban Element.
        var iban = elements.create('iban', {
          style: style,
          supportedCountries: ['SEPA'],
        });
        iban.mount('#example1-iban');
        registerElements([iban], 'example1');
      <% else %>
        var card = elements.create('card', {
          hidePostalCode: true,
          iconStyle: 'solid',
          style: style
        });
        card.mount('#example1-card');
        registerElements([card], 'example1');
      <% end %>


    <% end %>
  });

  // $(document).ready(function() {
  //   var ajax = new XMLHttpRequest();
  //   ajax.open("GET", "/ajaxes/comuni", true);
  //   ajax.onload = function() {
  //     var list = JSON.parse(ajax.responseText).map(function(i) {
  //       return i;
  //     });
  //     new Awesomplete(
  //       document.querySelector(".js-select-comuni"), {
  //         list: list,
  //         data: function (item, input) {
  //           return { label: item.nome, value: item.id };
  //         }
  //       });
  //   };
  //   ajax.send();
  // })
</script>
 */
}
