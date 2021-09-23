// -*- coding: utf-8 -*-
/** @module type */
'use strict'
/* !
    region header
    [Project page](https://torben.website/storelocator)

    Copyright Torben Sickert (info["~at~"]torben.website) 16.12.2012

    License
    -------

    This library written by Torben Sickert stand under a creative commons
    naming 3.0 unported license.
    See https://creativecommons.org/licenses/by/3.0/deed.de
    endregion
*/
// region imports
import PropertyTypes from 'clientnode/property-types'
import {
    Mapping,
    ObjectMaskConfiguration,
    PlainObject,
    Primitive,
    ProcedureFunction,
    RecursiveEvaluateable,
    RecursivePartial,
    ValueOf
} from 'clientnode/type'
import 'grecaptcha'
import {
    RequestInit as FetchOptions, Response as FetchResponse
} from 'node-fetch'
import {Model, Properties} from 'web-input-material/type'
// endregion
export type {Model, Properties} from 'web-input-material/type'

declare global {
    interface Window {
        dataLayer:Array<unknown>
    }
}

export type IndicatorFunction = (defaultValue?:boolean) => boolean

export type InputConfiguration<Type = unknown> =
    Omit<RecursivePartial<Properties<Type>>, 'value'> &
    {
        dataMapping?:Mapping|string
        dependsOn?:Array<string>|null
        domNode?:AnnotatedDomNode
        dynamicExtend?:Mapping<(event:Event) => unknown>
        dynamicExtendExpressions?:Mapping<((event:Event, scope:unknown) => unknown)|string>
        changedEventName?:string
        serializer?:(value:unknown) => Primitive
        serializerExpression?:string
        showIf?:IndicatorFunction
        showIfExpression?:string
        shown?:boolean
        target?:string
        transformer?:(value:unknown) => unknown
        transformerExpression?:string
        value?:null|Type
        valuePersistence?:'persistent'|'resetOnHide'
    }

export type Annotation = {
    clearFading?:ProcedureFunction
    oldDisplay?:string
    oldOpacity?:number
    showIf?:IndicatorFunction
    shown:boolean
}
export type InputAnnotation<Type = unknown> = {
    changeTrigger?:unknown
    default:Type
    dirty:boolean
    disabled:boolean
    externalProperties?:InputAnnotation<Type>
    initialValue?:Type
    invalid:boolean
    model?:Model<Type>
    pristine:boolean
    selection:Array<Type>
    showInitialValidationState:boolean
    type:string
    valid:boolean
    value:Type
}
export type AnnotatedDomNode = HTMLElement & Annotation
export type AnnotatedInputDomNode<Type = unknown> =
    AnnotatedDomNode & InputAnnotation<Type>

export type Action = {
    code:string
    indicator:() => unknown
    name:string
    target:string
}

export type Constraint = {
    description:string
    evaluation:string
}

export type TargetConfiguration = {
    options:FetchOptions & Partial<{
        cache:'default'|'reload'|'no-cache'
        credentials:'omit'|'same-origin'|'include'
        headers:Headers|Mapping
        mode:'cors'|'no-cors'|'same-origin'|'navigate'
    }>
    url:string
}

export type Evaluation = [string, () => unknown]
export type Expression = [string, string]

export type Configuration = {
    actions:Mapping<Action>
    animation:boolean
    constraints:Array<Constraint>
    data:null|Mapping<unknown>
    debug:boolean
    evaluations:Array<Evaluation>
    expressions:Array<Expression>
    fields?:Mapping<InputConfiguration>
    initializeTarget:TargetConfiguration
    inputs:Mapping<InputConfiguration>
    name:string
    model?:Mapping<InputConfiguration>
    offsetInPixel:number
    reCaptcha:{
        action:ReCaptchaV2.Action
        key:{
            v2:ReCaptchaV2.Parameters['sitekey']
            v3:string
        }
        secret:string
        skip:boolean
        token:string
    }
    responseDataWrapperSelector:{
        optional:boolean
        path:string
    }
    securityResponsePrefix:string
    selector:{
        clearButtons:string
        groups:string
        inputs:string
        reCaptchaFallbackInput:string
        resetButtons:string
        spinner:string
        statusMessageBoxes:string
        submitButtons:string
        truncateButtons:string
    }
    showAll:boolean
    tag:{
        secret:string
        values:Array<string>
    }
    target:RecursiveEvaluateable<TargetConfiguration>
    targetData:null|Mapping<unknown>
    urlConfigurationMask:ObjectMaskConfiguration
    version:number
}

export type PropertyTypes = {
    baseConfiguration:ValueOf<typeof PropertyTypes>
    configuration:ValueOf<typeof PropertyTypes>
    dynamicConfiguration:ValueOf<typeof PropertyTypes>
}

export type Response = FetchResponse & {data:PlainObject}
export type ResponseResult = {
    data:Mapping<unknown>
    invalidInputNames:Array<string>
}
// region vim modline
// vim: set tabstop=4 shiftwidth=4 expandtab:
// vim: foldmethod=marker foldmarker=region,endregion:
// endregion
