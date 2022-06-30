/**
@license
Copyright (c) 2022 meta4d.me Authors

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
 */
/// <reference path="ParticleModule.ts" />

namespace m4m.framework
{
    /**
     * 粒子系统 旋转角度随速度变化模块
     */
    export class ParticleRotationBySpeedModule extends ParticleModule
    {
        /**
         * Set the rotation by speed on each axis separately.
         * 在每个轴上分别设置随速度变化的旋转。
         */
        separateAxes = false;

        /**
         * 角速度，随速度变化的旋转。
         */
        angularVelocity = serialization.setValue(new MinMaxCurveVector3(), { xCurve: { constant: 45, constantMin: 45, constantMax: 45, curveMultiplier: 45 }, yCurve: { constant: 45, constantMin: 45, constantMax: 45, curveMultiplier: 45 }, zCurve: { constant: 45, constantMin: 45, constantMax: 45, curveMultiplier: 45 } });

        /**
         * Apply the rotation curve between these minimum and maximum speeds.
         * 
         * 在这些最小和最大速度之间应用旋转曲线。
         */
        range = new math.vector2(0, 1);

        /**
         * Rotation by speed curve for the X axis.
         * 
         * X轴的旋转随速度变化曲线。
         */
        get x()
        {
            return this.angularVelocity.xCurve;
        }

        set x(v)
        {
            this.angularVelocity.xCurve = v;
        }

        /**
         * Rotation multiplier around the X axis.
         * 
         * 绕X轴旋转乘法器
         */
        get xMultiplier()
        {
            return this.x.curveMultiplier;
        }

        set xMultiplier(v)
        {
            this.x.curveMultiplier = v;
        }

        /**
         * Rotation by speed curve for the Y axis.
         * 
         * Y轴的旋转随速度变化曲线。
         */
        get y()
        {
            return this.angularVelocity.yCurve;
        }

        set y(v)
        {
            this.angularVelocity.yCurve = v;
        }

        /**
         * Rotation multiplier around the Y axis.
         * 
         * 绕Y轴旋转乘法器
         */
        get yMultiplier()
        {
            return this.y.curveMultiplier;
        }

        set yMultiplier(v)
        {
            this.y.curveMultiplier = v;
        }

        /**
         * Rotation by speed curve for the Z axis.
         * 
         * Z轴的旋转随速度变化曲线。
         */
        get z()
        {
            return this.angularVelocity.zCurve;
        }

        set z(v)
        {
            this.angularVelocity.zCurve = v;
        }

        /**
         * Rotation multiplier around the Z axis.
         * 
         * 绕Z轴旋转乘法器
         */
        get zMultiplier()
        {
            return this.z.curveMultiplier;
        }

        set zMultiplier(v)
        {
            this.z.curveMultiplier = v;
        }

        /**
         * 初始化粒子状态
         * @param particle 粒子
         */
        initParticleState(particle: Particle1)
        {
            particle[_RotationBySpeed_rate] = Math.random();
            particle[_RotationBySpeed_preAngularVelocity] = new math.vector3();
        }

        /**
         * 更新粒子状态
         * @param particle 粒子
         */
        updateParticleState(particle: Particle1)
        {
            var preAngularVelocity: math.vector3 = particle[_RotationBySpeed_preAngularVelocity];
            particle.angularVelocity.x -= preAngularVelocity.x;
            particle.angularVelocity.y -= preAngularVelocity.y;
            particle.angularVelocity.z -= preAngularVelocity.z;

            preAngularVelocity.x = 0;
            preAngularVelocity.y = 0;
            preAngularVelocity.z = 0;
            if (!this.enabled) return;

            var velocity = math.vec3Length(particle.velocity);
            var rate = math.floatClamp((velocity - this.range.x) / (this.range.y - this.range.x), 0, 1);

            var v = this.angularVelocity.getValue(rate, particle[_RotationBySpeed_rate]);
            if (!this.separateAxes)
            {
                v.x = v.y = 0;
            }
            particle.angularVelocity.x += v.x;
            particle.angularVelocity.y += v.y;
            particle.angularVelocity.z += v.z;

            preAngularVelocity.x = v.x;
            preAngularVelocity.y = v.x;
            preAngularVelocity.z = v.x;
        }
    }
    var _RotationBySpeed_rate = "_RotationBySpeed_rate";
    var _RotationBySpeed_preAngularVelocity = "_RotationBySpeed_preAngularVelocity";
}